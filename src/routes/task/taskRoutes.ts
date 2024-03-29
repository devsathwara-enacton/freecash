import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as taskController from "./task.controller";
import { isAuthenticated } from "../../middleware/authMiddleware";
import { fetchTaskQuerySchema, fetchTaskResponseSchema } from "./task.schemas";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    // preHandler: isAuthenticated,
    method: "GET",
    url: "/",
    schema: {
      querystring: fetchTaskQuerySchema,
      tags: ["Clicks"],
    },
    handler: taskController.fetch,
  });
}
