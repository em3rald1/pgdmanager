var gd = require("gdprofiles")
var discord = require("discord.js")

/**
 * 
 * @param {discord.Client} client 
 * @param {discord.Message} message 
 * @param {String[]} args 
 * @param {String} prefix 
 * @param {String} lang 
 */

module.exports.run = async(client, message, args, prefix, lang) => {
    if(lang === 'ru_RU') {
    var daily = await gd.getDailyLevel();
    var embed = new discord.MessageEmbed()
    embed.setTitle("> __Daily__")
    embed.setDescription("<:info:740968491967971449> Уровень: `" + daily.name + "`\n<:cp:740968456576434230> Строитель: `" + daily.creator + "`\n<:astar:740971007522898022> Сложность: `" + daily.diff + "`\n<:locked:740970154971889704> Айди: `" + daily.id+'`')
    embed.setThumbnail("https://i.imgur.com/TDsJkTk.png")
    embed.setFooter("GDManager", client.user.avatarURL())
    embed.setColor("ae96f8");
    message.channel.send(embed);
    } else if(lang === 'en_EN') {
        var daily = await gd.getDailyLevel();
        var embed = new discord.MessageEmbed()
        embed.setTitle("> __Daily__")
        embed.setDescription("<:info:740968491967971449> Level: `" + daily.name + "`\n<:cp:740968456576434230> Creator: `" + daily.creator + "`\n<:astar:740971007522898022> Difficulty: `" + daily.diff + "`\n<:locked:740970154971889704> ID: `" + daily.id+'`')
        embed.setThumbnail("https://i.imgur.com/TDsJkTk.png")
        embed.setFooter("GDManager", client.user.avatarURL())
        embed.setColor("ae96f8");
        message.channel.send(embed);
    }
}

module.exports.info ={
    tag: "daily",
    usage: "daily",
    description_ru: 'Получает информацию о ежедневном уровне',
    description_en: 'Gets information of daily level',
    category: 'gd_manage'
}
