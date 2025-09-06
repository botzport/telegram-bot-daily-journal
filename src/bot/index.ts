import { Bot } from "https://deno.land/x/grammy@v1.38.2/mod.ts";
import { registerHandlers } from "./handlers/index.ts";

export const createBot = (botToken: string) => (store: { users: any[] }): Bot => {
  const bot = new Bot(botToken);

  // Register all handlers
  registerHandlers(bot)(store);

  return bot;
};
