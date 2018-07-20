# type-tools

This is a simple module for Discord developers which helps you to use Discord API more easily.

### Methods/Functions

**embed()** - Create Embed

```javascript
const typetools = require('type-tools');
const tools = new typetools('Bot Token');

tools.embed(message, 'This is easy way to send embed!', 0x65cafe, 3000 /* with ms */);
```

**createchannel()** - Create Channel

```javascript
const typetools = require('type-tools');
const tools = new typetools('Bot Token');

tools.createchannel("Guild ID", 0 /* Text: 0, DM: 1 Voice: 2, Group DM: 3, Category: 4 */, 'channel-name', 'topic-text' /* optional */, false /* NSFW param is boolean (optional) */).then(channel => {
    console.log(channel);
});
```

**modifychanne()** - Modify Channel

```javascript
const typetools = require('type-tools');
const tools = new typetools('Bot Token');

tools.modifychannel("Channel ID", 'new channel-name', 'new topic-text' /* optional */, false /* NSFW param is boolean (optional) */).then(channel => {
    console.log(channel);
});
```

**deletechannel()** - Delete Channel

```javascript
const typetools = require('type-tools');
const tools = new typetools('Bot Token');

tools.deletechannel('Channel ID').then(channel => {
    console.log(channel);
});
```

**attachment()** - Attachment

```javascript
const typetools = require('type-tools');
const tools = new typetools('Bot Token');

tools.attachment(message, "https://discordapp.com/assets/f72fbed55baa5642d5a0348bab7d7226.png", "This is a attachment." /* message content is optional */);
```

**kick()** - Kick a Member

```javascript
const typetools = require('type-tools');
const tools = new typetools('Bot Token');

tools.kick("Guild ID", "Member ID").then(kicked => {
    console.log(kicked);
});
```

**ban()** - Ban a Member

```javascript
const typetools = require('type-tools');
const tools = new typetools('Bot Token');

tools.ban("Guild ID", "Member ID", Number /* Amount of days delete the user's messages */, "Reason" /* Reason for the ban */).then(banned => {
    console.log(banned);
});
```

**unban()** - Unban a Banned Member

```javascript
const typetools = require('type-tools');
const tools = new typetools('Bot Token');

tools.unban("Guild ID", "Member ID").then(unbanned => {
    console.log(unbanned);
});
```

**addrole()** - Add a role to a Member.

```javascript
const typetools = require('type-tools');
const tools = new typetools('Bot Token');

tools.addrole("Guild ID", "Member ID", "Role ID").then(role => {
    console.log(role);
});
```

**removerole()** - Remove a role from a Member.

```javascript
const typetools = require('type-tools');
const tools = new typetools('Bot Token');

tools.removerole("Guild ID", "Member ID", "Role ID").then(role => {
    console.log(role);
});
```

**modifymember()** - Modify a Member.

```javascript
const typetools = require('type-tools');
const tools = new typetools('Bot Token');

tools.modifymember('Guild ID', 'Member ID', 'New Nickname', false /* Boolean, mute member is muted in VC  */, false /* Boolean, deafen member in VC */).then(user => {
    console.log(user);
});
```

**bulkdelete()** - Bulkdelete

```javascript
const typetools = require('type-tools');
const tools = new typetools('Bot Token');

tools.bulkdelete('Channel ID', ['Message ID', 'Message ID', 'Message ID', 'Message ID']).then(messages => {
    console.log(messages);
});
```

### Contributors

**eg#3000**

**raspberry#7562**
"# type-tools" 
