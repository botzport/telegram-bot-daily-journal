import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts";
import { scheduleDailyReminder } from "@/services/notifications.ts";
import { createBot } from "@/bot/index.ts";
import { getUsers } from "@/stores/users.ts";

// Load environment variables
const env = await load();

// Set up fake store
const users = getUsers(env);
const store = { users };

// Create and start bot
const bot = createBot(env.BOT_TOKEN)(store);
bot.start();

console.log("Bot started! 🤖");

// Cron job to send daily reminder at 7 AM GMT, use "0 7 * * *"
scheduleDailyReminder({ bot, users });
