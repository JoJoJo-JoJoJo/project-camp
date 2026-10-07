import fp from "fastify-plugin";
import { fromNodeHeaders } from "better-auth/node";
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

//TODO: REMEMBER TO GENERATE + MIGRATE DB
//TODO: RE-READ DISCORD CONVERSATION ON COMMON PACKAGE + TYPES

export async function registerAuthHooksPlugin(app: FastifyInstance) {
  await app.register(fp(async (fastify: FastifyInstance) => {
    fastify.decorate("authenticate", async (req: FastifyRequest, reply: FastifyReply) => {
      const session = await fastify.auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
      });

      if (!session?.user) {
        return reply.code(401).send({ error: "Unauthorized" });
      }

      req.session = session.session;
      req.user = session.user;
    });
  }, {
    name: "auth-hooks",
    dependencies: ["auth-plugin"]
  }
  ));
}
