import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";
import { createBot } from "./src/bot/index.ts"

// Load environment variables
const env = await load();

// Create and start bot
const bot = createBot(env.BOT_TOKEN);
bot.start();

console.log("Bot started! 🤖");
