const sequelize = require('../config/connection');
const { User, Events, Memberships } = require('../models');

const userData = require('./userData.json');
const eventData = require('./eventData.json');
const membershipData = require('./membershipData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const event of eventData) {
    await Events.create({
      ...event,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
