const SympactEmbedBuilder = require("../../lib/embedBuilder");
const { prefix } = require("../../config");

module.exports = {
    name: "ping",
    description: "Say ping!",
    usage: `${prefix}ping`,
    execute(message, args) {
      const embed = new SympactEmbedBuilder()
        .setTitle("Pong!")
        .setDescription(`${message.client.websocket.ping}ms`);
      message.reply({ embeds: [embed] });
    },
};
