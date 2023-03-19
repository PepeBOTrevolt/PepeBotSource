const { prefix } = require("../config");

module.exports = {
  name: "meme",
  description: "Generates a random meme.",
  usage: `${prefix}meme`,
  async execute(message, args) {
    const response = await fetch("https://meme-api.com/gimme");
    const data = await response.json();

    message.reply(`${data.title}\n${data.preview[2]}`);
  },
};
