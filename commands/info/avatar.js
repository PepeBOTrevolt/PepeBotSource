const { prefix } = require("../../config");

module.exports = {
  name: "avatar",
  description: "Gets a users avatar.",
  usage: `${prefix}avatar <@user>`,
  async execute(message, args) {
    const user = message.mentions[0] || message.author;

    message.reply(`${user.username}'s avatar\n${user.avatarURL}`);
  },
};
