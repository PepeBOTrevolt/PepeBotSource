onst SympactEmbedBuilder = require("../lib/embedBuilder");
const { prefix } = require("../config");

module.exports = {
  name: "whois",
  description: "Gets info about a user.",
  usage: `${prefix}whois`,
  async execute(message, args) {
    const user = message.mentions || message.author;

    let User = 0;
    let Developer = 1;
    let Translator = 2;
    let Supporter = 4;
    let ResponsibleDisclosure = 8;
    let Founder = 16;
    let PlatformModeration = 32;
    let ActiveSupporter = 64;
    let Paw = 128;
    let EarlyAdopter = 256;
    let badges = user.badges;
    let embedBadge = "";

    if ((badges & User) == User) {
      embedBadge += "No badges";
    } else {
      embedBadge += "";
    }

    if ((badges & Developer) == Developer) {
      embedBadge += "Developer, ";
    } else {
      embedBadge += "";
    }

    if ((badges & Translator) == Translator) {
      embedBadge += "Translator, ";
    } else {
      embedBadge += "";
    }

    if ((badges & Supporter) == Supporter) {
      embedBadge += "Supporter, ";
    } else {
      embedBadge += "";
    }

    if ((badges & ResponsibleDisclosure) == ResponsibleDisclosure) {
      embedBadge += "Responsible Disclosure, ";
    } else {
      embedBadge += "";
    }

    if ((badges & Founder) == Founder) {
      embedBadge += "Founder, ";
    } else {
      embedBadge += "";
    }
    
    if ((badges & PlatformModeration) == PlatformModeration) {
      embedBadge += "Platform Moderation, ";
    } else {
      embedBadge += "";
    }

    if ((badges & ActiveSupporter) == ActiveSupporter) {
      embedBadge += "Active Supporter, ";
    } else {
      embedBadge += "";
    }

    if ((badges & Paw) == Paw) {
      embedBadge += "Paw, ";
    } else {
      embedBadge += "";
    }

    if ((badges & EarlyAdopter) == EarlyAdopter) {
      embedBadge += "Early Adopter, ";
    } else {
      embedBadge += "";
    }

    const embed = new SympactEmbedBuilder()
      .setTitle(`${user.username}`)
      .setIcon(`${user.avatarURL}`)
      .setDescription(`ID: \`${user._id}\`
      Joined Revolt: \`${new Date(user.createdAt).toLocaleString()}\`
      Badges:\`${embedBadge}\`
      
      [[Avatar URL]](${user.avatarURL})`);
    message.reply({ embeds: [embed] });
  },
};
