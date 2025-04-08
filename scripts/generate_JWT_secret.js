const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const envPath = path.join(__dirname, '../.env');
const newSecret = uuidv4();

let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

if (envContent.includes('JWT_SECRET=')) {
    envContent = envContent.replace(/JWT_SECRET=.*/, `JWT_SECRET=${newSecret}`);
} else {
    envContent += `\nJWT_SECRET=${newSecret}\n`;
}

fs.writeFileSync(envPath, envContent);
console.log(`✅ JWT_SECRET đã được cập nhật: ${newSecret}`);
