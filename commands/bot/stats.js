const SympactEmbedBuilder = require("../../lib/embedBuilder");
const { prefix } = require("../../config");

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
      .setTitle("A simple and useful multi-purpose bot for your Revolt server!")
      .setDescription(`Servers: \`${message.client.servers.size}\`
      Users: \`${message.client.users.size}\`
      Heartbeat: \`${message.client.websocket.heartbeat}\`
      Uptime: \`${getUptime()}\`
      Version: \`${require("../../package.json").version}\`
      Build: \`${require("child_process").execSync("git rev-parse --short HEAD", {cwd: __dirname}).toString().trim()}\`

      [Dashboard (soon!)](https://app.revolt.chat) | [Support Server](https://rvlt.gg/Fj2RwDNP) | [GitHub](https://github.com/PepeBOTrevolt)`);
    message.reply({ embeds: [embed] });
  },
};
