const { MessageEmbed, Client } = require('discord.js');
const client = new Client();
const owners = ['283312969931292672', '659572152873385996']

require('dotenv').config()
client.login(process.env.TOKEN)

const server = process.env.GUILD;



client.on('ready', () => {
    let array = [];
    client.guilds.cache.forEach(g => array.push(g.memberCount))
    let userCount = array.reduce((a, b) => a + b)

    console.log(`${client.user.tag} está online com ${userCount} utilizadores`)
    client.user.setActivity(`mc.mangocraftpt.tk`)
});

client.on('guildMemberAdd', (member) => {
    const guildFetched = client.guilds.cache.get(server)
    const welcomeChannel = guildFetched.channels.cache.get(process.env.JOINS)
    const welcomeEmbed = new MessageEmbed()
        .setAuthor(`Bem-vindo ${member.user.username}!`, guildFetched.iconURL())
        .setDescription(`Dá uma vista de olhos em ${guildFetched.channels.cache.get('826119289664569405') ? guildFetched.channels.cache.get('826119289664569405') : '<#826119289664569405>'} e \n${guildFetched.channels.cache.get('826119312435445800') ? guildFetched.channels.cache.get('826119312435445800') : '<#826119312435445800>'} para começar!`)
        .setColor('RANDOM')
        .setThumbnail(member.user.avatarURL())
        .setTimestamp()
    welcomeChannel.send(welcomeEmbed)

    const joinRole = guildFetched.roles.cache.get('826126149536055377') || guildFetched.roles.cache.find(role => role.name === 'Membro')
    member.roles.add(joinRole)
        .catch(err => console.log(err))

    setTimeout(() => {
        const guildFetchedTwice = client.guilds.cache.get(server)
        const statChannel = guildFetchedTwice.channels.cache.get(process.env.MEMBER_STAT)
        statChannel.edit({ name: `${statChannel.guild.memberCount} Membros` })
            .then(console.log('joined'))
            .catch(err => console.log(err))
    }, 5000)
});

client.on('guildMemberRemove', () => {
    setTimeout(() => {
        const guildFetched = client.guilds.cache.get(server)
        const statChannel = guildFetched.channels.cache.get(process.env.MEMBER_STAT)
        statChannel.edit({ name: `${statChannel.guild.memberCount} Membros` })
            .then(console.log('left'))
            .catch(err => console.log(err))
    }, 5000)
})

client.on('message', async (message) => {
    const prefix = 'mango'
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    if (message.content.startsWith(prefix)) {
        switch (args[0]) {
            case 'ping':
                message.channel.send(`De momento estou a \`${client.ws.ping}ms\` de ping!`)
                break;

            case 'eval':
                if (owners.includes(message.author.id)) {
                    try {
                        const res = await eval(args.slice(1).join(" "))
                        message.channel.send(`\`\`\`js\n${res}\`\`\``)
                    } catch (err) {
                        message.channel.send('Error', `\`\`\`js\n${err}\`\`\``)
                    }
                }
                break;
                
                case 'anuncie':
                    const items = args.slice(1).join(' ').split('|')
                    message.channel.send({ embed: { title: items[0], description: items[1], timestamp: Date.now(), footer: `Anúncio por ${messagr.author.tag}`, color: '#fa820a' } })
                    break;
        }
    } else {
        if (message.channel.id === '826124252494430308') {
            message.react('✅')
            message.react('❌')
        }
    }
})
