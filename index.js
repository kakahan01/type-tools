const Discord = require('discord.js'),
    snekfetch = require('snekfetch');

class type_tools {
    constructor(token) {

        this.token = token;
        if (!this.token || this.token.length !== 59 || typeof this.token !== 'string') throw Error('Invalid Login Details were provided!');
    };

    /**
     * Send a embed to Message's text channel or provided text channel
     * @param {string} channel
     * @param {string} message
     * @param {int} color
     * @param {number} timer
     */

    embed(channel, message, color, timer) {
        if (!channel) throw new SyntaxError("Channel must be provided");
        if (!message) throw new SyntaxError("Message must be provided");
        var colour = color || 0xdbafc6;
        channel = channel.channel || channel;
        channel.send({
            embed: {
                description: message,
                color: colour
            }
        }).then(msg => {
            if (!isNaN(timer)) {
                setTimeout(() => {
                    msg.delete();
                }, timer);
            };
        })
    }

    /**
     * Send a attachment to Message's text channel or provided text channel
     * @param {string} channel
     * @param {string} url
     * @param {string} message
     */

    attachment(channel, url, message) {
        channel = channel.channel || channel;

        var msg = message || "";
        var urls = url || "https://www.apdch.edu.in/images/404.png";
        if (!channel) throw new SyntaxError("Channel must be provided");

        channel.send(msg, {
            file: urls
        });
    }

    /**
     * Ban a Member/User
     * @param {string} guild_id
     * @param {string} member_id
     * @param {number} days
     * @param {string} reason
     */

    ban(guild_id, member_id, days, reason) {
        if (typeof guild_id !== 'string') throw new SyntaxError('Please supply a Guild ID!')
        if (typeof member_id !== 'string') throw new SyntaxError('Please supply a Member ID!');
        if (!days) days = 0;
        if (!reason) reason = null;
        return new Promise((resolve, _reject) => {
            snekfetch.put(`https://discordapp.com/api/guilds/${guild_id}/bans/${member_id}?delete-message-days=${days}&reason=${reason}`)
                .set('Authorization', `Bot ${this.token}`)
                .then(response => {
                    resolve(response)
                })
                .catch(e => console.log(e));
        });
    }

    /**
     * Unban a User
     * @param {string} guild_id
     * @param {string} member_id
     */

    unban(guild_id, member_id) {
        if (typeof guild_id !== 'string' || typeof member_id !== 'string') throw new SyntaxError('Guild ID and Member ID is required!');
        return new Promise((resolve, _reject) => {
            snekfetch.delete(`https://discordapp.com/api/guilds/${guild_id}/bans/${member_id}`)
                .set('Authorization', `Bot ${this.token}`)
                .then(response => {
                    resolve(response)
                })
                .catch(e => console.log(e));
        });
    }

    /**
     * Kick a User
     * @param {string} guild_id
     * @param {string} member_id
     */

    kick(guild_id, member_id) {
        if (typeof guild_id !== 'string' || typeof member_id !== 'string') throw new SyntaxError('Guild ID and Member ID is required!');
        return new Promise((resolve, _reject) => {
            snekfetch.delete(`https://discordapp.com/api/guilds/${guild_id}/members/${member_id}`)
                .set('Authorization', `Bot ${this.token}`)
                .then(response => {
                    resolve(response)
                })
                .catch(e => console.log(e));
        });
    }

    /** Create a Text Channel
     * @param {string} guild_id
     * @param {number} channel_type
     * @param {string} channel_name
     * @param {string} channel_topic
     * @param {boolean} nsfw
     */

    createchannel(guild_id, channel_type, channel_name, channel_topic, nsfw) {
        if (typeof guild_id !== 'string') throw new SyntaxError('Please supply a Guild ID!');
        if (typeof channel_type !== 'number') throw new SyntaxError('Please supply a Channel Type!');
        if (typeof channel_name !== 'string') throw new SyntaxError('Please supply a Channel Name!');
        // if (typeof channel_topic !== 'string') throw new SyntaxError('Please supply channel topic');
        // if (typeof nsfw !== 'boolean') throw new SyntaxError('NSFW parameter must be a boolean!');

        return new Promise((resolve, _reject) => {
            snekfetch.post(`https://discordapp.com/api/guilds/${guild_id}/channels`)
                .set('Authorization', `Bot ${this.token}`)
                .send({
                    name: channel_name,
                    type: channel_type,
                    topic: channel_topic,
                    nsfw: nsfw
                })
                .then(response => {
                    resolve(JSON.parse(response.text));
                })
                .catch(e => console.log(e));
        });
    }

    /** Edit a Text Channel
     * @param {string} channel_id
     * @param {string} channel_name
     * @param {string} channel_topic
     * @param {boolean} nsfw
     */
    modifychannel(channel_id, channel_name, channel_topic, nsfw) {
        if (typeof channel_id !== 'string') throw new SyntaxError('Please supply a Channel ID!');
        if (typeof channel_name !== 'string') throw new SyntaxError('Please supply a Channel Name!');
        // if (typeof channel_topic !== 'string') throw new SyntaxError('Please supply channel topic');
        // if (typeof nsfw !== 'boolean') throw new SyntaxError('NSFW parameter must be a boolean!');
        return new Promise((resolve, _reject) => {
            snekfetch.patch(`https://discordapp.com/api/channels/${channel_id}`)
                .set('Authorization', `Bot ${this.token}`)
                .send({
                    name: channel_name,
                    topic: channel_topic,
                    nsfw: nsfw
                })
                .then(response => {
                    resolve(JSON.parse(response.text))
                })
                .catch(e => console.log(e));
        });
    }

    /** Delete a Channel
     * @param {string} channel_id
     */

    deletechannel(channel_id) {
        if (typeof channel_id !== 'string') throw new SyntaxError('Please supply a Channel ID!');
        return new Promise((resolve, _reject) => {
            snekfetch.delete(`https://discordapp.com/api/channels/${channel_id}`)
                .set('Authorization', `Bot ${this.token}`)
                .then(response => {
                    resolve(JSON.parse(response.text));
                })
                .catch(e => console.log(e));
        });
    }

    /**
     * Add role to a Member
     * @param {string} guild_id
     * @param {string} user_id
     * @param {string} role_id
     */

    addrole(guild_id, user_id, role_id) {
        if (typeof guild_id !== 'string') throw new SyntaxError('Please supply a Guild ID!');
        if (typeof user_id !== 'string') throw new SyntaxError('Please supply a User ID!');
        if (typeof role_id !== 'string') throw new SyntaxError('Please supply a Role ID');
        return new Promise((resolve, _reject) => {
            snekfetch.put(`https://discordapp.com/api/guilds/${guild_id}/members/${user_id}/roles/${role_id}`)
                .set('Authorization', `Bot ${this.token}`)
                .then(response => {
                    resolve(response)
                })
                .catch(e => console.log(e));
        });
    }

    /** Remove a role from Member
     * @param {string} guild_id
     * @param {string} user_id
     * @param {string} role_id
     */

    removerole(guild_id, user_id, role_id) {
        if (typeof guild_id !== 'string') throw new SyntaxError('Please supply a Guild ID!');
        if (typeof user_id !== 'string') throw new SyntaxError('Please supply a User ID!');
        if (typeof role_id !== 'string') throw new SyntaxError('Please supply a Role ID');
        return new Promise((resolve, _reject) => {
            snekfetch.delete(`https://discordapp.com/api/guilds/${guild_id}/members/${user_id}/roles/${role_id}`)
                .set('Authorization', `Bot ${this.token}`)
                .then(response => {
                    resolve(response)
                })
                .catch(e => console.log(e));
        });
    }

    /** Modify a Guild Member
     * @param {string} guild_id
     * @param {string} member_id
     * @param {string} nickname
     * @param {boolean} muted
     * @param {boolean} deafen
     */

    modifymember(guild_id, member_id, nickname, muted, deafen) {
        if (typeof guild_id !== 'string' || typeof member_id !== 'string' || typeof nickname !== 'string') throw new SyntaxError('The first three parameters must be a String!');
        if (!muted) muted = false;
        if (!deafen) deafen = false;
        return new Promise((resolve, _reject) => {
            snekfetch.patch(`https://discordapp.com/api/guilds/${guild_id}/members/${member_id}`)
                .set('Authorization', `Bot ${this.token}`)
                .send({
                    nick: nickname,
                    mute: muted,
                    deaf: deafen
                })
                .then(response => {
                    resolve(response)
                })
                .catch(e => console.log(e));
        });
    }

    /*
     * Deletes a specified amount of messages
     * @param {string} channel_id
     * @param {array} message_ids
     */

    bulkdelete(channel_id, message_ids) {
        if (typeof channel_id !== 'string') throw Error('Please supply a Channel ID.');
        if (!Array.isArray(message_ids) || message_ids < 2 || message_ids > 100) throw Error('Please supply an Array of Message ID\'s to delete! (Limit: 2-100)');
        return new Promise((resolve, _reject) => {
            snekfetch.post(`https://discordapp.com/api/channels/${channel_id}/messages/bulk-delete`)
                .set('Authorization', `Bot ${this.token}`)
                .send({
                    messages: message_ids
                })
                .then(response => {
                    resolve(response)
                })
                .catch(e => console.log(e));
        })
    }

};

module.exports = type_tools;
