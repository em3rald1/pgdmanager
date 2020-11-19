module.exports.run = async(client, message, args) => {
    message.channel.send(Buffer.from(args.join(" "), 'base64').toString());
}

module.exports.info = {
    tag: 'frombase64',
    usage:'frombase64 <message>',
    description_ru: "Переводит base64 строку в utf8 строку",
    description_en: "Translates base64 string to utf8 string",
    category: 'fun'
}