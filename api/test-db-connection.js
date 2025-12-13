require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    console.log('Testing MongoDB Connection...');
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error('❌ Error: MONGODB_URI is missing in .env file');
        return;
    }

    try {
        await mongoose.connect(uri);
        console.log('✅ SUCCESS: Connected to MongoDB Atlas successfully!');
        console.log('Your database connection string is working.');
        process.exit(0);
    } catch (error) {
        console.error('❌ FAIL: Could not connect to MongoDB.');
        console.error('Error details:', error.message);
        console.log('\nPossible causes:');
        console.log('1. IP Address not allowed in Atlas Network Access (set to 0.0.0.0/0)');
        console.log('2. Wrong password in connection string');
        console.log('3. Firewall blocking connection');
        process.exit(1);
    }
}

testConnection();
