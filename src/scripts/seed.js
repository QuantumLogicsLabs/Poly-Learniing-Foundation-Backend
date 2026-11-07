// npm run seed - upserts the built-in projects and roles into MongoDB.
require('dotenv').config();
const mongoose = require('mongoose');
const { seedAll } = require('../data/seed');

(async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set. Copy .env.example to .env first.');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  const result = await seedAll();
  console.log('Seed complete:', result);
  await mongoose.disconnect();
})().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
