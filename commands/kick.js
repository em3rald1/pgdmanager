let discord = require("discord.js");

/**
 * 
 * @param {discord.Client} client 
 * @param {discord.Message} message 
 * @param {String[]} args 
 * @param {String} prefix
 * @param {String} lang 
 */
module.exports.run = async(client, message, args, prefix, lang) => {
    const author_ = message.member;
    const target_ = message.guild.members.cache.filter(u => u.id === message.mentions.users.first().id).first();
    const reason_ = args.join(" ").slice(22);
    const channel_ = message.channel;
    const ban = target_.kick;
    const bannable = target_.kickable;
    if(!author_.hasPermission('KICK_MEMBERS')) {
        if(bannable) {
            let mssage = new discord.MessageEmbed();
            mssage
                .setTitle('Kick hammer has been spoken!')
                .addField(lang === 'ru_RU' ? `${target_.user.username} был кикнут` : `${target_.user.username} has been kicked`, 
                          lang === 'ru_RU' ? `Администратор: \n` : `Administrator: \n`+
                          `${author_.user}\n`+
                          lang === 'ru_RU' ? `Причина: \n` : `Reason: \n`+
                          `${reason_}\n`+
                          lang === 'ru_RU' ? `Канал: \n` : 'Channel: \n'+
                          `${channel_}`
                )
                .setThumbnail(target_.user.avatarURL())
                .setTimestamp(new Date());
            message.channel.send(mssage);
            ban({
                'reason': reason_,
            });
        } else {
            return message.channel.send(
                lang === 'ru_RU' ? '```Этого пользователя невозможно кикнуть!```' : '```You cannot kick this user!```'
            );
        }
    } else {
        return message.channel.send(lang === 'ru_RU'? '```Вы не имеете прав использовать данную комманду!```' : '```You cannot use this command!```');
    }
}

module.exports.info = {
    tag: "kick",
    usage: 'kick <tag> <reason>',
    description_ru: 'Кикает участника с сервера',
    description_en: "Kicks user on server",
    category: "moderation"
}