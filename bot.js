const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs')
const YTDL = require("ytdl-core")
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.generateInvite(["ADMINISTRATOR"])
  .then(link => {
    console.log(`Generated bot invite link: ${link}`);
  });
  let tempguild = client.guilds.find(`name`, `Coruscant Guard`);
  console.log(`Guild "${tempguild.name}" was found.`);
  let temprole = tempguild.roles.find('name', 'CAR: 401st Discord Manager');
  console.log(`Role "${temprole.name}" was found.`);
  if (temprole.hoist === true) {
    console.log('Hoist is active.');
    return;
  }
  if (!temprole.hoist === true) {
    temprole.hoist = true;
    console.log(temprole.hoist);
  }
  if(!tempguild.channels.find(`name`, `messagelogs`)) {
    console.log(`Unable to find messagelogs channel.`);
    tempguild.createChannel(`messagelogs`, `text`);
    console.log(`Created messagelogs channel.`);
    return;
  }
  if(tempguild.channels.find(`name`, `messagelogs`)) {
    console.log(`messasgelogs channel was found.`);
  }
  client.user.setGame('with the wonderful Coruscant Guard.');
});
client.on('message', msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return msg.channel.sendMessage("Sorry, but I am currently not capable of responding to DMs.");
  console.log(`${msg.author.username} sent "${msg.content}" in #${msg.channel.name}`);
  let channel = msg.channel.guild.channels.find(`name`, `messagelogs`);
  channel.sendMessage(`${msg.author.username} sent "${msg.content}" in ${msg.channel}`);
  channel.sendMessage(`______________________`);
  if (msg.content === '-401-test') {
    msg.reply('this is a test response to a test prompt message.');
    return;
  }
  if (msg.content === '-401-botinfo') {
    msg.reply('this discord bot is scripted and managed by XavierTG for usage by the ROBLOX group: CAR Coruscant Guard. This bot currently logs messages sent in the server. Still a work in progress.');
    return;
  }
  if (msg.content === '-401-help') {
    msg.reply('here is a list of available commands: -401-test, -401-music');
    return;
  }
  if (msg.content === '-401-commands') {
    msg.reply('here is a list of available commands: -401-test, -401-music');
    return;
  }
  if (msg.content === '-401-music') {
    msg.reply('this command is not finished yet, but is coming soon.');
    return;
    msg.reply('please send the link if the youtube video you wish to play.');
  }
  if (msg.content.startsWith('-401-')) {
    msg.reply('you did not call for a valid command. Available commands are: -401-test, -401-music');
    return;
  }
});
client.on('messageUpdate', function(oldmsg, newmsg) {
  let channel = newmsg.channel.guild.channels.find('name', 'messagelogs');
  let person = newmsg.author.username;
  channel.sendMessage(`${person} edited a message.`);
  channel.sendMessage(`Before: ${oldmsg}`);
  channel.sendMessage(`After: ${newmsg}`);
  channel.sendMessage('______________');
  console.log(`${person} edited a message.`);
  console.log(`Before: ${oldmsg}`);
  console.log(`After: ${newmsg}`);
  console.log('______________');
});
client.login(process.env.BOT_TOKEN);
