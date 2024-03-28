import { decodeToken } from "../auth/jwt";
import * as bonuses from "./bonuses.model";
import { FastifyReply, FastifyRequest } from "fastify";

export const fetch = async (req: FastifyRequest, reply: FastifyReply) => {
  const token = req.cookies.token || req.headers["Authorization"];
  const decoded = await decodeToken(reply, token);
  const result = await bonuses.fetch(decoded.id);
  if (result) {
    return reply.sendSuccess(
      {
        bonuses: result.map((i: any) => ({
          id: i.id,
          user_id: i.user_id,
          bonus_code: i.bonus_code,
          amount: i.amount,
          awarded_on: i.awarded_on,
          expires_on: i.expires_on,
          referred_bonus_id: i.referred_bonus_id,
          status: i.status,
        })),
      },
      200,
      "null"
    );
  } else {
    return reply.callNotFound;
  }
};