var discord = require("discord.js");

module.exports.run = async(client, message, args, prefix) =>  {
    let embed = new discord.MessageEmbed()
    .setColor(0xa200ff)
    .setAuthor(message.author.username, message.author.avatarURL())
    .setThumbnail(message.author.avatarURL())
    .setTitle("Pong! :ping_pong:")
    .setDescription(client.ws.ping + " ms");
    message.channel.send(embed)
}

module.exports.info = {
    tag: "ping",
    usage: "ping",
    description_ru: 'Получает пинг бота',
    description_en: 'Get bot\' ping',
    category: "fun"
}
