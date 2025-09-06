import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";
import { scheduleDailyReminder } from "@/services/notifications.ts";
import { createBot } from "@/bot/index.ts";

// Load environment variables
const env = await load();

// Create and start bot
const bot = createBot(env.BOT_TOKEN);
bot.start();

console.log("Bot started! 🤖");

// NOTE: this simulates database of users
const users = [
  { chatId: env.TEST_CHAT_ID, timezone: "America/New_York" },
];

// Cron job to send daily reminder at 7 AM GMT, use "0 7 * * *"
scheduleDailyReminder({ bot, users });
