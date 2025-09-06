import { Bot } from "https://deno.land/x/grammy/mod.ts";

export function registerHandlers(bot: Bot) {
  bot.command("start", (ctx) => ctx.reply("What's your name?"));
  bot.on("message:text", (ctx) => {
    const userText = ctx.message.text;
    ctx.reply(`Hello ${userText}`);
  });
  bot.command("help", (ctx) => ctx.reply("Send me your daily journal entries!"));
}
