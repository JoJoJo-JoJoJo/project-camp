import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const healthResponseSchema = z.object({
	status: z.literal("ok"),
	timestamp: z.string(),
	uptime: z.number(),
});

export const healthRoutes: FastifyPluginAsync = async (app) => {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/health",
		{
			schema: {
				description: "Root service health check endpoint",
				tags: ["Health"],
				response: {
					200: healthResponseSchema,
				},
			},
		},
		async () => {
			return {
				status: "ok" as const,
				timestamp: new Date().toISOString(),
				uptime: process.uptime(),
			};
		},
	);
};
