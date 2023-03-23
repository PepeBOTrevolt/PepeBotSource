const SympactEmbedBuilder = require("../../lib/embedBuilder");
const { prefix } = require("../../config");

module.exports = {
  name: "serverinfo",
  description: "Gets info about your server.",
  usage: `${prefix}serverinfo`,
  async execute(message, args) {
    const embed = new SympactEmbedBuilder()
        .setTitle(`${message.channel.server.name}`)
        .setIcon(message.channel.server.icon ? `https://autumn.revolt.chat/icons/${message.channel.server.icon._id}` : null)
        .setDescription(`ID: \`${message.channel.server._id}\`
        Owner: <@${message.channel.server.owner}>
        Members: \`${Object.keys(message.channel.server.member || []).length}\`
        Roles: \`${Object.keys(message.channel.server.roles || []).length}\`
        Channels: \`${Object.keys(message.channel.server.channels || []).length}\`
        Created at: \`${new Date(message.channel.server.createdAt).toLocaleString()}\`
        
        ${message.channel.server.description}`);
    message.reply({ embeds: [embed] });
  },
};
