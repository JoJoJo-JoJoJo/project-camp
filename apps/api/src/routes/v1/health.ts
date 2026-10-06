import { db } from "@repo/db";
import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const v1HealthResponseSchema = z.object({
	status: z.enum(["ok", "degraded"]),
	timestamp: z.string(),
	uptime: z.number(),
	version: z.string(),
	services: z.object({
		database: z.enum(["healthy", "disconnected", "error"]),
	}),
});

export const v1HealthRoutes: FastifyPluginAsync = async (app) => {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/health",
		{
			schema: {
				description: "API v1 service health check endpoint with database probe",
				tags: ["Health"],
				response: {
					200: v1HealthResponseSchema,
				},
			},
		},
		async () => {
			let databaseStatus: "healthy" | "disconnected" | "error" = "disconnected";

			if (process.env.DATABASE_URL) {
				try {
					await db.$client.query("SELECT 1");
					databaseStatus = "healthy";
				} catch {
					databaseStatus = "error";
				}
			}

			const isDegraded = databaseStatus === "error";

			return {
				status: isDegraded ? ("degraded" as const) : ("ok" as const),
				timestamp: new Date().toISOString(),
				uptime: process.uptime(),
				version: "v1",
				services: {
					database: databaseStatus,
				},
			};
		},
	);
};
