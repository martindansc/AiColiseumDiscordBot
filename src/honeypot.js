const Config = require('./config');

class Honeypot {
    constructor(client) {
        this.client = client;
        this.channelId = Config.honeypotChannelId;
        this.windowMinutes = Config.honeypotWindowMinutes;
    }

    async handleMessage(message) {
        if (message.channel.id !== this.channelId) return;
        if (message.author.bot) return;
        if (!message.guild) return;

        const guild = message.guild;
        const member = message.member;
        const author = message.author;

        console.log(`[Honeypot] Triggered by ${author.tag} (${author.id}) in #${message.channel.name}`);
        
        if (member && member.permissions.has('ADMINISTRATOR')) {
            console.log(`[Honeypot] Ignored admin user ${author.tag}`);
            return;
        }

        await this.banMember(guild, member, author, message.channel.name);

        await this.deleteRecentMessages(guild, author);
    }

    async banMember(guild, member, author, channelName) {
        try {
            if (member) {
                await member.ban({ reason: `Honeypot: sent message in ${channelName}` });
            } else {
                await guild.members.ban(author.id, { reason: `Honeypot: sent message in ${channelName}` });
            }
            console.log(`[Honeypot] Banned ${author.tag}`);
        } catch (error) {
            console.error(`[Honeypot] Failed to ban ${author.tag}:`, error);
        }
    }

    async deleteRecentMessages(guild, author) {
        const windowMs = this.windowMinutes * 60 * 1000;
        const since = Date.now() - windowMs;
        const channels = guild.channels.cache.filter(
            c => c.type === 'text' && c.viewable
        );

        for (const [, channel] of channels) {
            try {
                const messages = await channel.messages.fetch({ limit: 100 });
                const toDelete = messages.filter(
                    m => m.author.id === author.id && m.createdTimestamp > since
                );
                if (toDelete.size > 0) {
                    await channel.bulkDelete(toDelete, true);
                    console.log(`[Honeypot] Deleted ${toDelete.size} messages from ${author.tag} in #${channel.name}`);
                }
            } catch (error) {
                if (error.code !== 50001 && error.code !== 50013 && error.code !== 10003) {
                    console.error(`[Honeypot] Error in #${channel.name}:`, error);
                }
            }
        }
    }
}

module.exports = Honeypot;
