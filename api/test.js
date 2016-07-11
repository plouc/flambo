const dotenv       = require('dotenv');
const SourceLoader = require('./src/sources/SourceLoader');
const MeetupSource = require('./src/sources/MeetupSource');

dotenv.config({ silent: true });

SourceLoader.register('meetup', MeetupSource({
    apiKey: process.env.MEETUP_API_KEY,
}));

SourceLoader.load('meetup', {
    
})

