import fp from "fastify-plugin";
import { auth } from "@repo/auth";
import type { FastifyInstance } from "fastify";

export async function registerAuthPlugin(app: FastifyInstance) {
  await app.register(fp(async (fastify: FastifyInstance) => {
    fastify.decorate("auth", auth);

    fastify.decorate("session", null);
    fastify.decorate("user", null);
  }, {
    name: "auth-plugin",
    fastify: "5.x"
  }
  ));
}