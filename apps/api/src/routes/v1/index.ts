import type { FastifyPluginAsync } from "fastify";
import { v1HealthRoutes } from "./health.js";

export const v1Routes: FastifyPluginAsync = async (app) => {
	await app.register(v1HealthRoutes);
};
