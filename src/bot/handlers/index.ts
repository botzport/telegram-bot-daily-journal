import { Bot, InlineKeyboard } from "https://deno.land/x/grammy/mod.ts";
import { incrementState, STATES } from "../../stores/users.ts";

export const registerHandlers = (bot: Bot) => (store: { users: any[] }) => {
  // Set bot commands (appears in menu next to chat input)
  bot.api.setMyCommands([
    { command: "start", description: "Start the bot" },
    { command: "goals", description: "🎯 Set daily goals" },
    { command: "reflect", description: "💭 Did I accomplish my goals?" },
    { command: "settings", description: "⚙️ Bot settings" },
  ]);

  // commands have to go first
  bot.command("start", (ctx) => ctx.reply("What's your name?"));
  bot.command("goals", (ctx) => ctx.reply("🎯 What is your definition for success today?"));
  bot.command("reflect", (ctx) => {
    const keyboard = new InlineKeyboard()
      .text("✅ Yes", "reflect_yes")
      .text("❌ No", "reflect_no");

    ctx.reply("💭 Did you accomplish your goals today?", {
      reply_markup: keyboard,
    });
  });

  // Handle "Set Goals" button click
  bot.callbackQuery("set_goals", (ctx) => {
    ctx.answerCallbackQuery(); // Acknowledge the button click
    ctx.reply("🎯 What is your definition for success today?");
  });

  // Handle reflect button clicks
  bot.callbackQuery("reflect_yes", (ctx) => {
    ctx.answerCallbackQuery();
    const chatId = ctx.update.callback_query.from.id;
    incrementState({ users: store.users, chatId });

    ctx.reply("🎉 Congratulations! You accomplished your goals today. Keep it up!");
  });

  bot.callbackQuery("reflect_no", (ctx) => {
    ctx.answerCallbackQuery();
    const chatId = ctx.update.callback_query.from.id;
    incrementState({ users: store.users, chatId });
    ctx.reply("🌱 That's okay! Tomorrow is a new opportunity. What will you do differently?");
  });

  bot.on("message:text", (ctx) => {
    const userText = ctx.message.text;
    const chatId = ctx.message.chat.id;
    const user = store.users.find((u) => u.chatId == chatId);
    switch (user.state) {
      case STATES.AWAITING_GOALS:
        incrementState({ users: store.users, chatId });
        ctx.reply(`Got it! Your goals for today are: ${userText}`);
        break;
      case STATES.REFLECTION_RECEIVED:
        ctx.reply(`Thanks for your reflection: ${userText}`);
        break;
      default:
        ctx.reply(`Your message: ${userText}`);
    }
  });
};
