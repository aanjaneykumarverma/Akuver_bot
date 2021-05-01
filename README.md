# Akuver_bot

A cool multi purpose discord bot with commands for Fun, Moderation, Utility, Economy, Image and Games also with administrator only commands !!

[Add It](https://discord.com/api/oauth2/authorize?client_id=815474132182368256&permissions=1342434400&scope=bot)

![LOC](https://tokei.rs/b1/github/Akuver/Akuver_bot?category=code)
[![dependencies](https://img.shields.io/david/Akuver/Akuver_bot)](https://david-dm.org/Akuver/Akuver_bot)

## Commands

## Moderation

| Name   | Description                  | Usage                         | Example                |
| ------ | ---------------------------- | ----------------------------- | ---------------------- |
| Ban    | Bans a user from the server  | !ban [Mention or ID]          | !ban @Akuver           |
| Kick   | Kicks a user from the server | !kick [Mention or ID]         | !kick @Akvuer          |
| Mute   | Mutes a user in the server   | !mute [Mention or ID][reason] | !mute @Akuver spamming |
| Unmute | Unmutes a user in the server | !unmute [Mention or ID ]      | !unmute @Akuver        |

## Fun

| Name     | Description                            | Usage             | Example            |
| -------- | -------------------------------------- | ----------------- | ------------------ |
| 8ball    | Bot answers the question you ask for   | !8ball [Question] | !8ball Am I cool ? |
| booyah   | Replies with Tight Tight!              | !booyah           | !booyah            |
| Coinflip | Flips a coin for you                   | !coinflip         | !coinflip          |
| Joke     | Tells you a joke                       | !joke             | !joke              |
| Simprate | Gets the simprate of the provided user | !simprate [user]  | !simprate @Akuver  |

## Utility

| Name     | Description                                 | Usage                                                            | Example                                   |
| -------- | ------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------- |
| Help     | Gives the list of all of bot's commands     | !help                                                            | !help                                     |
| QR       | Sends QR code for the link provided         | !qr [Link]                                                       | !qr https://www.google.com                |
| Schedule | Schedules a message                         | !schedule [Channel Tag][yyyy/mm/dd] [HH:MM][am or pm] [Timezone] | !schedule 2021/05/01 5:30 PM Asia/Kolkata |
| Slow     | Sets the slowmode duration for a channel    | !slow [DURATION(s)][reason]                                      | !slow 15 COOLDOWN                         |
| Ticket   | Issue a ticket for the issue you are facing | !ticket [ISSUE]                                                  | !ticket Bot not working                   |

## Image

| Name       | Description                                   | Usage                             | Example         |
| ---------- | --------------------------------------------- | --------------------------------- | --------------- |
| Avatar     | Sends the avatar of the mentioned user        | !avatar [Mention or ID(optional)] | !avatar @Akuver |
| ServerIcon | Sends the servericon                          | !servericon                       | !servericon     |
| Affect     | Send the user's avatar in affect my baby meme | !affect [user]                    | !affect @Akuver |
| Stonk      | Send the user's avatar in stonks meme         | !stonk [user]                     | !stonk @Akuver  |
| Slap       | Slaps the user                                | !slap [user]                      | !slap @Akuver   |
| Wanted     | Put the user in the wanted meme               | !wanted [user]                    | !wanted @Akuver |
| Trash      | Send the user's avatar in trash meme          | !trash [user]                     | !trash @Akuver  |

## Currency

| Name        | Description                          | Usage                               | Example               |
| ----------- | ------------------------------------ | ----------------------------------- | --------------------- |
| Balance     | Returns the balance of the user.     | !bal [Mention or ID(optional)]      | !bal @Akuver          |
| Leaderboard | Displays the leaderboard (Top x)     | !leaderboard [x(Max 10)(optional)]  | !leaderboard 5        |
| Transfer    | Transfers currency to mentioned user | !transfer [Currency][mention or id] | !transfer 500 @Akuver |

## Misc

| Name       | Description                                                         | Usage                        | Example           |
| ---------- | ------------------------------------------------------------------- | ---------------------------- | ----------------- |
| Botinfo    | Gives the information of the bot                                    | !botinfo                     | !botinfo          |
| Userinfo   | Gives the information of the user which is mentioned or provided ID | !userinfo [Mention or ID]    | !userinfo @Akuver |
| Ping       | Gives the latency and API latency of the bot                        | !ping                        | !ping             |
| Weather    | Provides information about the weather of mentioned place           | !weather [CITY]              | !weather New York |
| Dictionary | Gives the meaning of the provided word or phrase                    | !dictionary [WORD or PHRASE] | !dictionary hello |

## SetChannels

| Name       | Description                                    | Usage                     | Example              |
| ---------- | ---------------------------------------------- | ------------------------- | -------------------- |
| SetLeave   | Sets the leave-logs channel for the server     | !setleave [Channel Tag]   | !setleave #leave     |
| SetPoll    | Sets the poll channel for the server           | !setpoll [Channel Tag]    | !setpoll #polls      |
| SetPrefix  | Sets the prefix for the bot                    | !setprefix [Channel Tag]  | !setprefix !         |
| SetRole    | Sets the role-claim channel for the server     | !setrole [Channel Tag]    | !setrole #roles      |
| SetRule    | Sets the rules-and-info channel for the server | !setrule [Channel Tag]    | !setrule #rules      |
| SetTicket  | Sets the ticket channel for the server         | !setticket [Channel Tag]  | !setticket #ticket   |
| SetWelcome | Sets the welcome channel for the server        | !setwelcome [Channel Tag] | !setwelcome #welcome |

## Testing

| Name     | Description             | Usage     | Example   |
| -------- | ----------------------- | --------- | --------- |
| SimJoin  | Simulates a join event  | !simjoin  | !simjoin  |
| SimLeave | Simulates a leave event | !simleave | !simleave |

## Games

| Name            | Description                                    | Usage                      | Example            |
| --------------- | ---------------------------------------------- | -------------------------- | ------------------ |
| Tictactoe       | Play Tic-tac-toe with the mentioned user       | !tictactoe [Mention or ID] | !tictactoe @Akuver |
| AmongUsCategory | Sets a category for Among Us voice channel.    | !aucatset [Category Name]  | !aucatset hola     |
| AmongUs         | Makes it easier to play among us with friends. | !au [Region][code]         | !au US 223344      |
