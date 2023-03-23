"use strict";

const { Client } = require("revolt.js");
const fs = require("fs");
const { token, prefix, owners } = require("./config.js");

class MyRevoltBot {
  constructor() {
    this.client = new Client({
      autoReconnect: true
    });
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
        message.author.bot
      ) return;
      if (message.content.startsWith(`<@${this.client.user._id}>`)) {
          message.reply({
            content: "",
            embeds: [{
              description: `My prefix for ${message.channel.server.name} is \`${prefix}\``
            }]
          }
        );
      }
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      // eval command (bot owner only)
      if (commandName == "eval") {
        if (!owners.includes(message.author._id)) return message.reply("invalid permissions!");

        try {
          const evaled = eval(args.join(" "));
          message.reply(`\`\`\`js\n${evaled}\n\`\`\``);
        } catch (err) {
          message.reply(`\`\`\`xl\n${err}\n\`\`\``);
        }
      }

      // server list command (bot owner only)
      if (commandName == "sl") {
        if (!owners.includes(message.author._id)) return message.reply("invalid permissions!");

        let serverArray = [];
        this.client.servers.forEach(server => {
          serverArray.push(server.name);
        });
        
        const s = serverArray.map(e => e).join("\n")
        message.channel.sendMessage({
          content: "",
          embeds: [{
            title: `${this.client.user.username} server list`,
            description: `${s}`
          }]
        })
      }
      
      const command = this.commands.get(commandName);
      if (!command) return;
      command.execute(message, args);
    } catch (err) {
      console.error("Error handling message:", err);
    }
  }

  // load commands
  loadCommands() {
    fs.readdirSync("./commands", { withFileTypes: true })
      .forEach((dirs) => {
        if (dirs.isFile()) return;

        const commandFiles = fs
          .readdirSync(`./commands/${dirs.name}/`)
          .filter((file) => file.endsWith(".js"));
      
        for (const file of commandFiles) {
          const command = require(`./commands/${dirs.name}/${file}`);
          this.commands.set(command.name, command);
          console.info(`Loaded ${command.name}`);
        }
      }
    );
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

// help cmd
myBot.commands.set("help", {
  name: "help",
  description: "Displays all of the avaliable commands.",
  usage: `${prefix}help`,
  execute: myBot.help.bind(myBot),
});

// Revolt Template by @Sympact06 // index.js

module.exports = myBot;
