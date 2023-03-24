const { prefix } = require("../../config");

module.exports = {
  name: "fetchavatar",
  description: "Gets a users avatar from their user id.",
  usage: `${prefix}fetchavatar <USER_ID>`,
  async execute(message, args) {
    const userId = args[0];
    if (!userId) return message.reply("userId required!");

    const user = message.client.users.get(userId);

    message.reply(`${user.username}'s avatar\n${user.avatarURL}`);
  },
};
