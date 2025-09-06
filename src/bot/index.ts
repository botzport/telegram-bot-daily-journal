import { Bot } from "https://deno.land/x/grammy@v1.38.2/mod.ts";
import { registerHandlers } from "./handlers/index.ts";

export function createBot(botToken: string): Bot {
  const bot = new Bot(botToken);

  // Register all handlers
  registerHandlers(bot);

  return bot;
}
