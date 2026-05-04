const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Trainer = require('./models/Trainer');
const Program = require('./models/Program');
const Membership = require('./models/Membership');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for Seeding');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  try {
    console.log('Clearing old data...');
    await Trainer.deleteMany();
    await Program.deleteMany();
    await Membership.deleteMany();

    console.log('Inserting Memberships...');
    await Membership.insertMany([
      { name: 'Basic', priceMonthly: 29, priceYearly: 290, benefits: ['Daily Gym Access', 'Standard Locker', 'Fitness Assessment'], isBest: false },
      { name: 'Elite', priceMonthly: 79, priceYearly: 790, benefits: ['24/7 Access', 'Private Locker', 'Personal Trainer', 'Nutrition Plan'], isBest: true },
      { name: 'Pro', priceMonthly: 149, priceYearly: 1490, benefits: ['All Gym Locations', 'Spa & Sauna', 'Guest Passes', 'Recovery Zone'], isBest: false },
    ]);

    console.log('Inserting Trainers...');
    await Trainer.insertMany([
      { name: 'Marcus Steel', role: 'Strength Architect', bio: 'Specializing in explosive power and progressive overload strategies. Former Olympic lifter.', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800' },
      { name: 'Elena Vance', role: 'Mobility Expert', bio: 'Focusing on kinetic chain restoration and advanced yoga flow to prevent injuries.', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800' },
      { name: 'Dante King', role: 'Metabolic Specialist', bio: 'Expert in fat oxidation protocols and high-intensity circuit design for max calorie burn.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800' },
      { name: 'Sophia Lin', role: 'Endurance Coach', bio: 'Triathlon veteran. Specializes in stamina building and cardiovascular optimization.', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800' }
    ]);

    console.log('Inserting Programs...');
    await Program.insertMany([
      { title: 'Hypertrophy Masterclass', description: 'Build serious muscle mass with progressive overload techniques over 12 weeks.', durationWeeks: 12, difficulty: 'Advanced' },
      { title: 'Cardio Core Shred', description: 'High-intensity intervals combined with core strengthening to burn fat quickly.', durationWeeks: 8, difficulty: 'Intermediate' },
      { title: 'Foundations of Movement', description: 'Perfect for beginners. Learn proper form, mobility, and basic strength.', durationWeeks: 4, difficulty: 'Beginner' }
    ]);

    console.log('Data successfully seeded!');
    process.exit();
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
