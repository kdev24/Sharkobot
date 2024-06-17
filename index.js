const { EmbedBuilder, Discord, Client, messageLink, NewsChannel, Guild } = require("discord.js")

const client = new Client({intents: 3276799});

client.on('ready', async () => {
    console.log('login as: ', client.user.username)
}) 

client.on('messageCreate', async (message) => {    
    if (message.content === 'test') {
        await message.channel.send('hello world');
    }
})

client.on('messageDelete', async (message) => {
    console.log('message deleted: ', message.content, 'from : ', message.author.username)

    if (!message.content || message.author.bot){
        return;
    }

    let MessageContent = message.content;
    if (message.content.length >= 1000) {
        MessageContent = message.content.slice(0, 300) + '...';
    }

    const embed = new EmbedBuilder()
    .setTitle(`Message supprimé depuis : <#${message.channel.id}>`)
    .setAuthor({iconURL: `${message.author.displayAvatarURL()}`, name: message.author.username})
    .setColor('Red')
    .setDescription(`**Contenu : **\n ${message.content}`)
    .setFooter({text: `ID : ${message.id}`})
    .setTimestamp()

    client.channels.cache.get('1251653084585922600').send({embeds: [embed]})
})

client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (!oldMessage.content || newMessage.author.bot){
        return;
    }

    let oldMessageContent = oldMessage.content;
    let newMessageContent = newMessage.content;

    if (oldMessage.content.length >= 1000) {
        oldMessageContent = oldMessage.content.slice(0, 300) + '...';
    }
    if (newMessage.content.length >= 1000) {
        newMessageContent = newMessage.content.slice(0, 300) + '...';
    }
    
    console.log(`Ancien message: ${oldMessageContent}, Nouveau Message: ${newMessageContent}`)

    const embed = new EmbedBuilder()
    .setTitle(`Message modifié depuis : <#${oldMessage.channel.id}>`)
    .setAuthor({iconURL: `${oldMessage.author.displayAvatarURL()}`, name: oldMessage.author.username})
    .setColor('Yellow')
    .setDescription(`**Avant : **\n ${oldMessageContent} \n **Après : **\n ${newMessageContent}`)
    .setFooter({text: `ID : ${oldMessage.id}`})
    .setTimestamp()
       
    client.channels.cache.get('1251653084585922600').send({embeds: [embed]})
    
})

client.on('channelCreate', channel =>{
    const embed = new EmbedBuilder()
    .setTitle(`Salon créé : <#${channel.id}>`)
    .setColor('Green')
    .setAuthor({iconURL: channel.guild.iconURL(), name: channel.guild.name})
    .setFooter({text: `ID : ${channel.id}`})
    .setTimestamp()

    client.channels.cache.get('1251653084585922600').send({embeds: [embed]})
})

client.login('TOKEN')
