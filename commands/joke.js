const SympactEmbedBuilder = require("../lib/embedBuilder");
const { prefix } = require("../config");

module.exports = {
  name: "joke",
  description: "Generates a random joke.",
  usage: `${prefix}joke`,
  async execute(message, args) {
    const response = await fetch("https://joke.deno.dev/");
    const data = await response.json();

    var emojis = [
        "😂",
        "😭",
        "💀",
    ];
    var randomEmoji = Math.floor(Math.random()*emojis.length);

    const embed = new SympactEmbedBuilder()
      .setDescription(`${data.setup} ${data.punchline} ${emojis[randomEmoji]}`);
    message.reply({ embeds: [embed] });
  },
};
