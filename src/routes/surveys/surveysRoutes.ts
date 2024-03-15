import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as surveysController from "./surveys.controller";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { responseSchema,querySchema } from "./surveys.schema";
import { isAuthenticated } from "../../middleware/authMiddleware";
// import { fetchResponseSchema, querySchema } from "./surveys.schema";
export default async function (app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    preHandler:isAuthenticated,
    method: "GET",
    url: "/fetch",
    schema: {
    querystring: querySchema,
    response:{
      200: responseSchema
    },
      tags: ["Surveys"],
    },
    handler: surveysController.fetch,
  });
}
