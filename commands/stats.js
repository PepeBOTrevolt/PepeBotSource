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
    function getCurrentBuildNumber() {
      let comHash = require("child_process")
        .execSync("git rev-parse --short HEAD", {cwd: __dirname})
        .toString().trim();
      let comHashLong = require("child_process")
        .execSync("git rev-parse HEAD", {cwd: __dirname})
        .toString().trim();

      let comLink = (comHashLong) ? `https://github.com/PepeBOTrevolt/PepeBotSource/tree/${comHashLong}` : "https://github.com/PepeBOTrevolt/PepeBotSource";

      return `${comHash}`;
    }

    const embed = new SympactEmbedBuilder()
      .setDescription(`Servers: \`${message.client.servers.size}\`
      Users: \`${message.client.users.size}\`
      Uptime: \`${getUptime()}\`
      Build: \`${getCurrentBuildNumber()}\``);
    message.reply({ embeds: [embed] });
  },
};
