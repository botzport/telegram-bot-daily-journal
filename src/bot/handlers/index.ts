import { Bot } from "https://deno.land/x/grammy/mod.ts";

export const registerHandlers = (bot: Bot) => {
  // Set bot commands (appears in menu next to chat input)
  bot.api.setMyCommands([
    { command: "start", description: "Start the bot" },
    { command: "goals", description: "🎯 Set daily goals" },
    { command: "reflect", description: "💭 Did I accomplish my goals?" },
    { command: "settings", description: "⚙️ Bot settings" },
  ]);

  bot.command("start", (ctx) => ctx.reply("What's your name?"));
  bot.command("goals", (ctx) => ctx.reply("🎯 What is your definition for success today?"));

  // Handle "Set Goals" button click
  bot.callbackQuery("set_goals", (ctx) => {
    ctx.answerCallbackQuery(); // Acknowledge the button click
    ctx.reply("🎯 What is your definition for success today?");
  });

  bot.on("message:text", (ctx) => {
    const userText = ctx.message.text;
    ctx.reply(`Your goal is: ${userText}`);
  });
};
