export interface Guild {
  id: string;
  name: string;
}

export interface CreateGuildRequest {
  guildName: string;
  description: string;
}