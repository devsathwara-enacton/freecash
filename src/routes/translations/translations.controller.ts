import { FastifyReply, FastifyRequest } from "fastify";
import * as translation from "./translations.model";

export const fetch = async (req: FastifyRequest, reply: FastifyReply) => {
  const result = await translation.fetch();
  if (result) {
    return reply.status(200).send({
      success: true,
      data: {
        translations: result.map((i: any) => ({
          id: i.id,
          page: i.page,
          module: i.module,
          trans_key: i.trans_key,
          trans_value: i.trans_value,
        })),
      },
      error: null,
      msg: null,
    });
  } else {
    return reply.callNotFound;
  }
};