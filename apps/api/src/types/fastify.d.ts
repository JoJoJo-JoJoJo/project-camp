import "fastify";
import type { FastifyRequest, FastifyReply } from "fastify";
import type { auth } from "@repo/auth"; // Your Better Auth instance

declare module "fastify" {
  interface FastifyInstance {
    auth: typeof auth;
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    session: Awaited<ReturnType<typeof auth.api.getSession>>["session"] | null;
    user: Awaited<ReturnType<typeof auth.api.getSession>>["user"] | null;
  }
}