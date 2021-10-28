const { SMTPClient } = require('emailjs');

const client = new SMTPClient({
	user: 'alumonabenaiah251@gmail.com',
	password: 'benrobo8',
	host: 'smtp.gmail.com',
	ssl: true,
});

// send the message and get a callback with an error or details of the message that was sent
client.send(
	{
		text: 'i hope this works',
		from: 'you <username@your-email.com>',
		to: 'alumonabenaiah71@gmail.com',
		cc: 'else <else@your-email.com>',
		subject: 'testing emailjs',
	},
	(err, message) => {
		console.log(err || message);
	}
);