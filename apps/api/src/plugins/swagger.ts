import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";

export async function registerSwagger(app: FastifyInstance) {
	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	await app.register(swagger, {
		openapi: {
			info: {
				title: "Project Camp API",
				description: "Project Camp Fastify Backend API Service",
				version: "1.0.0",
			},
			servers: [
				{
					url: "/",
					description: "Default server",
				},
			],
			tags: [
				{ name: "Health", description: "Health check and status endpoints" },
			],
		},
		transform: jsonSchemaTransform,
	});

	await app.register(swaggerUi, {
		routePrefix: "/docs",
		uiConfig: {
			docExpansion: "list",
			deepLinking: true,
		},
	});
}
