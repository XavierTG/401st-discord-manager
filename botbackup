const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const YTDL = require("ytdl-core");
const JsonBinIoApi = require('jsonbin-io-api');
const api = new JsonBinIoApi(process.env.SECRET_KEY);
let musicplaying = false;
console.log(`${musicplaying}`);
var servers = {};
queue: []
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.generateInvite(["ADMINISTRATOR"])
  .then(link => {
    console.log(`Generated bot invite link: ${link}`);
  });
  let tempguild = client.guilds.find(`name`, `Coruscant Guard`);
  console.log(`Guild "${tempguild.name}" was found.`);
  if(!tempguild.channels.find(`name`, `messagelogs`)) {
    console.log(`Unable to find messagelogs channel.`);
    tempguild.createChannel(`messagelogs`, `text`);
    console.log(`Created messagelogs channel.`);
    return;
  }
  if(tempguild.channels.find(`name`, `messagelogs`)) {
    console.log(`messasgelogs channel was found.`);
  }
  client.user.setGame('Coruscant 2.2');
});
client.on('message', msg => {
  if (msg.author.bot) return;
  let channel = msg.channel.guild.channels.find(`name`, `messagelogs`);
  if (msg.content === '-401-addAoS') {
    msg.reply('Coming soon.');
    return;
  }
  if (msg.content === '-401-removeAoS') {
    msg.reply('Coming soon.');
    return;
  }
  if (msg.content === '-401-viewAoS') {
    msg.reply('You can view the AoS list at the following link: https://api.jsonbin.io/b/5b6525d72b23fb1f2b6da606/6');
    return;
  }
  if (msg.content === '-401-commands') {
    msg.reply('here is a list of available commands: -401-addAoS, -401-removeAoS');
    return;
  }
  if (msg.content.startsWith('-401-')) {
    msg.reply('you did not call for a valid command. Available commands are: -401-addAoS, -401-removeAoS');
    return;
  });
});

client.login(process.env.BOT_TOKEN);
