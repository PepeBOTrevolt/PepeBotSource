const SympactEmbedBuilder = require("../lib/embedBuilder");
const { prefix } = require("../config");

module.exports = {
  name: "stats",
  description: "Shows the bots stats.",
  usage: `${prefix}stats`,
  async execute(message, args) {
    function getUptime() {
      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }

    const embed = new SympactEmbedBuilder()
      .setDescription(`Servers: \`${message.client.servers.size}\`
      Users: \`${message.client.users.size}\`
      Uptime: \`${getUptime()}\``);
    message.reply({ embeds: [embed] });
  },
};
