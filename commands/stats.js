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
      
      return `${comHash}`;
    }

    async function fetchUsers() {
      const promises = [];
      for (const server of message.client.servers) {
        promises.push(server[1].fetchMembers());
      }
    }
    fetchUsers();
    setInterval(() => fetchUsers, 60 * 1000 * 30);

    const embed = new SympactEmbedBuilder()
      .setTitle("A simple and useful multi-purpose bot for your Revolt server!")
      .setDescription(`Servers: \`${message.client.servers.size}\`
      Users: \`${message.client.users.size}\`
      Uptime: \`${getUptime()}\`
      Build: \`${getCurrentBuildNumber()}\`

      [Dashboard (soon!)](https://app.revolt.chat) | [Support Server](https://rvlt.gg/Fj2RwDNP) | [GitHub](https://github.com/PepeBOTrevolt)`);
    message.reply({ embeds: [embed] });
  },
};
