import { buildApp } from "./app.js";
import { env } from "./config/env.js";

async function main() {
	const app = await buildApp();

	const signals = ["SIGINT", "SIGTERM"] as const;
	for (const signal of signals) {
		process.on(signal, async () => {
			app.log.info(`Received ${signal}, closing server...`);
			try {
				await app.close();
				process.exit(0);
			} catch (err) {
				app.log.error(err, "Error during graceful shutdown");
				process.exit(1);
			}
		});
	}

	try {
		await app.listen({ port: env.PORT, host: env.HOST });
		app.log.info(`API Server listening on http://${env.HOST}:${env.PORT}`);
		app.log.info(
			`Documentation available at http://${env.HOST}:${env.PORT}/docs`,
		);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

main();
