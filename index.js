// require the discord.js module
const Discord = require('discord.js');

const config = require('./config.json');

// const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
}

);

//Replying to DM's
client.on('message', message => {

	//const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

	if (message.channel.type == "dm") {
		if (message.author.bot) {
			return;
		}
		else {
			message.author.send("Why are you DMing a bot lol.");
			//return;
		}
	}
});

//Replying messages
client.on('message', message => {


	//Responding to hello
	if (message.content === 'Hi' || message.content === 'hi') {

		message.channel.send('Bye!');
	}

	//info
	if (message.content === `${config.prefix}info${config.suffix}`) {
		message.channel.send(`this is a message deletion bot, ${message.author}!`);
	}

	//illegal.
	if (message.content === 'cats') {
		message.channel.send('are nice.').then(msg => msg.delete(5000));
		message.delete('cats');

	}
	else if (message.content === 'dogs') {
		message.channel.send('are nice too.').then(msg => msg.delete(5000));
		message.delete('dogs');

	}

	//Clean user commands and bot messages
	if (message.content === `${config.prefix}clean${config.suffix}`) {

		message.channel.fetchMessages().then(messages => {
			const botMessages = messages.filter(msg => msg.author.bot);
			const commandMessages = messages.filter(msg => msg.content.startsWith("["));
			const toDeleteMessages = botMessages.concat(commandMessages); //?????

			//Running one bulk delete with a combined array is better
			//Two bulk delete runs after another no in sequence
			message.channel.bulkDelete(toDeleteMessages);

			messagesDeleted = botMessages.array().length + commandMessages.array().length; // number of messages deleted


			// Logging the number of messages deleted on both the channel and console.
			message.channel.send("Deletion of messages successful. Total messages deleted: " + messagesDeleted).then(msg => msg.delete(3000));
			console.log('Deletion of messages successful. Total messages deleted: ' + messagesDeleted)
		}).catch(err => {
			console.log('Error while doing Bulk Delete');
			console.log(err);
		});
	}
	else if (message.content === `${config.prefix}c${config.suffix}`) {

		message.channel.fetchMessages().then(messages => {
			const botMessages = messages.filter(msg => msg.author.bot);
			const commandMessages = messages.filter(msg => msg.content.startsWith("["));
			const toDeleteMessages = botMessages.concat(commandMessages); //?????

			//Running one bulk delete with a combined array is better
			//Two bulk delete runs after another no in sequence
			message.channel.bulkDelete(toDeleteMessages);

			messagesDeleted = botMessages.array().length + commandMessages.array().length; // number of messages deleted

			// Logging the number of messages deleted on both the channel and console.
			message.channel.send("Deletion of messages successful. Total messages deleted: " + messagesDeleted).then(msg => msg.delete(3000));
			console.log('Deletion of messages successful. Total messages deleted: ' + messagesDeleted)
		}).catch(err => {
			console.log('Error while doing Bulk Delete');
			console.log(err);
		});

	}


	//Mass deleter
	const args = message.content.slice(config.prefix2.length).split(' ');
	const command = args.shift().toLowerCase();

	if (!message.content.startsWith(config.prefix2) || message.author.bot) {
		return;
	}
	else if (command === 'delete' || command === 'd') {

		if (!args.length) {
			return message.channel.send(`You didn't provide how many lines to delete, " =delete 'x' ", ${message.author}!`);
		}

		if (args > 25) {
			message.channel.send('You can only delete 1 - 25 lines at a time.');
		}
		else if (args == 1) {
			message.channel
				.bulkDelete(parseInt(args[0], 10) + 1)
				.then(messages => console.log(`Bulk deleted ${messages.size - 1} messages`))
				.catch(console.error);

			message.channel.send("MASS Deletion of messages successful. Total messages deleted: " + args).then(msg => msg.delete(3000));

		}
		else {
			//Promise returns must have an error .catch 
			message.channel
				.bulkDelete(parseInt(args[0], 10) + 1)
				.then(messages => console.log(`Bulk deleted ${messages.size - 1} messages`))
				.catch(console.error);

			message.channel.send("MASS Deletion of messages successful. Total messages deleted: " + args).then(msg => msg.delete(3000));

		}
	}
});


//Joining voice channels
//In the works
client.on('message', message => {

	if (!message.guild) {
		return;
	}

	const channel = message.member.voiceChannel;

	if (message.content === `${config.prefix}join${config.suffix}`) {
		// Only try to join the sender's voice channel if they are in one themselves

		if (!channel) {
			message.channel.send('You\'re not in a voice channel! >.<');
		}
		else {
			channel.join().then(connection => console.log('Connected!')).catch(console.error);
		}

	}

	if (message.content === `${config.prefix}leave${config.suffix}`) {
		// Only try to join the sender's voice channel if they are in one themselves

		if (channel) //in channel, leave
		{
			channel.leave()
			console.log('Disconnected!');

		}
		else {
			message.channel.send('I\'m not in a channel! >.>');
		}
	}

	/*
	if (message.content.startsWith(`${config.prefix}"${config.suffix}`)) {
		// Only try to join the sender's voice channel if they are in one themselves
		
		if(!channel)
		{
			message.channel.send('You\'re not in a voice channel! >.<');
		}
		else
		{
			channel.join().then(connection => console.log('Connected!')).catch(console.error);
			message.voiceChannel.tts('Hello!');
			tts: true
			channel.leave();
			console.log('Disconnected!');

		}
	}
	*/


});

// login to Discord with your app's token
client.login(config.token);