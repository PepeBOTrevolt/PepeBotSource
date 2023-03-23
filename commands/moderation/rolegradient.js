const { prefix } = require("../../config");

module.exports = {
  name: "rolegradient",
  description: "Sets a role to a gradient color.",
  usage: `${prefix}rolegradient <ROLE_ID> <#HEX_1> <#HEX_2>`,
  async execute(message, args) {
    if (!message.member.hasPermission(message.channel.server, "BanMembers")) return message.reply("invalid permissions!");

    const roleId = args[0];
    if (!roleId) return message.reply("roleId required!");

    const hexColor1 = args[1];
    const hexColor2 = args[2];
    if (!hexColor1) return message.reply("hexColor1 required!");
    if (!hexColor2) return message.reply("hexColor2 required!");

    message.channel.server.editRole(roleId, { colour: `linear-gradient(45deg,${hexColor1},${hexColor2})` });
    message.reply(`role gradient changed to \`${hexColor1},${hexColor2}\` for role id \`${roleId}\``);
  },
};
