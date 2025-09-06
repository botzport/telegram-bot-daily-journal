# telegram-bot-daily-journal

## Localhost development

1. `brew install deno`
2. `deno task dev`

This starts a localhost server for the bot that polls the Telegram server for new messages.

Anyone can interacts with this bot.
<https://t.me/xy_dailyjournalbot>

When users send messages, Telegram queues them. If the localhost server goes down for a while and restart, it will process the queued messages.

For production, use webhook and deno deploy.
