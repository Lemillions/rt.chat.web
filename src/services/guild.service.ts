import { CreateGuildRequest, Guild } from "../types/guild";
import api from "./api";

export class GuildService {
  static async getGuilds(): Promise<Guild[]> {
    const response = await api.get("/guilds");

    return response.data;
  }

  static async addGuild(guild: CreateGuildRequest): Promise<Guild> {
    const response = await api.post("/guilds", guild);

    return response.data;
  }
}
