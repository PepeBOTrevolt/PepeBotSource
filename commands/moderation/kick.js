const { prefix } = require("../../config");

module.exports = {
  name: "kick",
  description: "Kicks a user.",
  usage: `${prefix}kick <@user> <reason>`,
  async execute(message, args) {
    if (!message.member.hasPermission(message.channel.server, "KickMembers")) return message.reply("invalid permissions!");

    const user = message.mentions[0] || message.author;

    const reason = args[1];
    if (!reason) return message.reply("reason required!");

    if (user._id == message.author._id) return message.reply("you cannot kick yourself!");

    message.reply(`Kicked \`${user.username}\` for \`${reason}\``);
  },
};
