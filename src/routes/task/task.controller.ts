import { FastifyReply, FastifyRequest } from "fastify";
import * as task from "./task.model";
import { FetchTaskQuery } from "./task.schemas";

export const fetch = async (req: FastifyRequest, reply: FastifyReply) => {
  const {
    countries,
    page_number,
    limit,
    platform,
    featured,
    network,
    category,
  } = req.query as FetchTaskQuery;
  const ArrPlat: string[] | null = platform ? platform.split(",") : null;
  const ArrCountry: string[] | null = countries ? countries.split(",") : null;

  const result = await task.fetch(
    typeof ArrCountry != undefined || ArrCountry ? ArrCountry : null,
    Number(page_number) || null,
    limit != null ? parseInt(limit.toString()) : limit,
    typeof ArrPlat != undefined || ArrPlat ? ArrPlat : null,
    featured != null || featured != undefined ? Number(featured) : null,
    network || null,
    Number(category) || null
  );

  if (result != null) {
    // Added type assertion to result to allow .map()
    const tasks = result.map((task: any) => ({
      name: task.Name ? JSON.parse(task.Name)?.en || null : null,
      description: task.description
        ? JSON.parse(task.description)?.en || null
        : null,
      instructions: task.instructions
        ? JSON.parse(task.instructions)?.en || null
        : null,
      id: task.ID,
      network: task.network,
      offer_id: task.offer_id,
      category_id: task.category_id,
      image: task.image,
      url: task.url,
      payout: task.payout,
      countries: task.countries ? JSON.parse(task.countries) : null,
      platforms: task.platforms ? JSON.parse(task.platforms) : null,
      status: task.status,
      is_featured: task.is_featured,
      goals_count: task.goals_count,
      goals: task.network_goals ? JSON.parse(task.network_goals) : null,
      provider: {
        code: task.code,
        name: task.network,
        icon: task.icon,
      },
      category: {
        name: task.name,
        id: task.category_id,
        icon: task.icon || null,
        bg_color: task.bg_color,
        sort_order: task.sort_order,
      },
    }));
    //cache

    

    return reply.status(200).send({
      success: "true",
      data: {
        tasks: tasks,
      },
      error: "null",
      msg: "null",
    });
  } else {
    return reply.status(404).send({
      error: "Not Found",
    });
  }
};
