import { cron } from "https://deno.land/x/deno_cron/cron.ts";
import { InlineKeyboard } from "https://deno.land/x/grammy@v1.38.2/mod.ts";

const IS_TEST_MODE = true;

export const scheduleDailyReminder = ({ bot, users }) => {
  const cronSchedule = IS_TEST_MODE ? "* * * * *" : "0 * * * *"; // Every minute vs every hour
  cron(cronSchedule, async () => {
    const now = new Date();

    for (const user of users) {
      try {
        // Get current time in user's timezone
        const userTime = new Intl.DateTimeFormat("en-US", {
          timeZone: user.timezone,
          hour: "numeric",
          hour12: false,
        }).format(now);

        const currentHour = parseInt(userTime);

        if (IS_TEST_MODE) {
          const keyboard = new InlineKeyboard()
            .text("🎯 Set Today's Goals", "set_goals");
          console.log(`Testing: Pretending it's 7AM in ${user.timezone} (actually ${currentHour})`);
          // Always send in test mode
          await bot.api.sendMessage(
            user.chatId,
            "🌅 [TEST] Good morning! Time to set your daily goals!",
            { reply_markup: keyboard },
          );
          console.log(`Test reminder sent to user in ${user.timezone}`);
          return;
        }

        // If it's 7 AM in their timezone, send reminder
        if (currentHour === 7) {
          await bot.api.sendMessage(
            user.chatId,
            "🌅 Good morning! Time to set your daily goals! What do you want to achieve today?",
          );
          console.log(`Reminder sent to user in ${user.timezone}`);
        }
      } catch (error) {
        console.error(`Failed to send reminder to ${user.timezone}:`, error);
      }
    }
  });
};
