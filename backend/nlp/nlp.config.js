// nlp.config.js
const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'] });

// Adding different keywords and intents
manager.addDocument('en', 'hello', 'greeting');
manager.addDocument('en', 'hi', 'greeting');
manager.addDocument('en', 'hey there', 'greeting');
manager.addDocument('en', 'good morning', 'greeting');
manager.addDocument('en', 'good afternoon', 'greeting');
manager.addDocument('en', 'greeting', 'greeting');
manager.addDocument('en', 'tell me about our records', 'records');
manager.addDocument('en', 'how can export the records?', 'records');
manager.addDocument('en', "show me today's exit status", 'exit status');
manager.addDocument('en', 'show me the busiest hour', 'busiest hour');
manager.addDocument('en', 'show me the most idle hour', 'idle hour');
manager.addDocument('en', 'show me the course that have the most students today', 'highest students in course');

// Answers for different intents
manager.addAnswer('en', 'greeting', 'hi, good day!');
manager.addAnswer('en', 'records', 'Our records shows the time in and time out of students that went in the library. We can export the records by clicking the download csv button under Records.');
manager.addAnswer('en', 'exit status', 'Fetching today\'s exit status...');
manager.addAnswer('en', 'busiest hour', 'Fetching the busiest hour...');
manager.addAnswer('en', 'idle hour', 'Fetching the most idle hour...');
manager.addAnswer('en', 'highest students in course', 'Fetching the course with the most students...');

module.exports = manager;