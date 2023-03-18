"use strict";

const { Client } = require("revolt.js");
const fs = require("fs");
const { token, prefix } = require("./config.js");
class MyRevoltBot {
  constructor() {
    this.client = new Client();
    this.commands = new Map();
    this.setupListeners();
    this.loadCommands();
  }

  // listenrs
  setupListeners() {
    this.client.on("ready", () =>
      console.info(`Logged in as ${this.client.user.username}!`),
    );
    this.client.once("ready", () =>
      this.client.users.edit({
        status: {
          text: `${prefix}help | ${this.client.servers.size} servers`,
          presence: "Online"
        },
      })
    );
    this.client.on("message", this.handleMessage.bind(this));
  }

  // message handler
  async handleMessage(message) {
    try {
      if (
        !message ||
        !message.content ||
        !message.content.startsWith(prefix) ||
        message.author.bot
      )
        return;
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();
      const command = this.commands.get(commandName);
      if (!command) return;
      command.execute(message, args);
    } catch (err) {
      console.error("Error handling message:", err);
    }
  }

  // load commands
  loadCommands() {
    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      this.commands.set(command.name, command);
    }
  }

  // login
  async login() {
    try {
      await this.client.loginBot(token);
    } catch (err) {
      console.error("Error logging in:", err);
    }
  }

  // connect to dashboard
  connectToDash() {
    this.client.once("ready", () => 
      require("./dashboard/server")
    )
  }

  // help command
  async help(message) {
    const commandList = Array.from(this.commands.values())
      .map((command) => `\`${prefix}${command.name}\`: ${command.description}`)
      .join("\n");
    await message.reply({
      content: "",
      embeds: [{
        title: `Available commands:`,
        description: `${commandList}`
      }]
    });
  }
}

// login and do other shit idk
const myBot = new MyRevoltBot();
myBot.login();
myBot.connectToDash();
myBot.commands.set("help", {
  name: "help",
  description: "Displays all of the avaliable commands.",
  usage: `${prefix}help`,
  execute: myBot.help.bind(myBot),
});

// Revolt Template by @Sympact06 // index.js

module.exports = myBot;