const { prefix } = require("../config");

module.exports = {
  name: "avatar",
  description: "Gets a users avatar.",
  usage: `${prefix}avatar`,
  async execute(message, args) {
    const user = message.mentions || message.author;

    message.reply(`${user.username}'s avatar\n${user.avatarURL}`);
  },
};
