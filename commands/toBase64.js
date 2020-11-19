const discord = require("discord.js");

/**
 * 
 * @param {discord.Client} client 
 * @param {discord.Message} message 
 * @param {String[]} args 
 */

module.exports.run = async(client, message, args) => {
    let message_ = args.join(" ");
    let b_end = Buffer.from(message_).toString('base64');
    message.channel.send(b_end);
}

module.exports.info = {
    tag: 'base64',
    usage:'base64 <message>',
    description_ru: 'Переводит сообщение в base64 строку',
    description_en: 'Translates message to base64 string',
    category: 'fun'
}