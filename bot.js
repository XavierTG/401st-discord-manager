const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.generateInvite(['ADMINISTRATOR'])
  .then(link => {
    console.log(`Generated bot invite link: ${link}`);
  });
});

client.on('message', msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return msg.channel.sendMessage("Sorry, but I am currently not capable of responding to DMs.");
  console.log(`${msg.author.username} sent "${msg.content}" in #${msg.channel.name}`);
  let channel = msg.channel.guild.channels.find(`name`, `logs`);
  channel.sendMessage(`${msg.author.username} sent "${msg.content}" in #${msg.channel.name}`);
  if (msg.content === '-401-test') {
    msg.reply('this is a test response to a test prompt message.');
    return;
  }
  if (msg.content === '-401-botinfo') {
    return;
    msg.reply('this discord bot is scripted and managed by XavierTG for usage by the ROBLOX group: CAR Coruscant Guard. This bot is in pre-alpha testing and is lacking many features at the moment. Still a work in progress.');
    return;
  }
  if (msg.content === '-401-help') {
    msg.reply('here is a list of available commands: -401-test');
  }
});

client.login(process.env.BOT_TOKEN);
