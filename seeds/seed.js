const sequelize = require('../config/connection');
const User = require('../models/User');
const Events = require('../models/Events');
const Memberships = require('../models/Memberships');

const userData = require('./userData.json');
const eventsData = require('./eventsData.json');
// const membershipsData = require('./membershipsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  for (const { id } of user) {
    const memberships = await Memberships.create({
      user_id: id,
    });
  }

  const events = await Events.bulkCreate(eventsData);

  for (const { id } of events) {
    const memberships = await Memberships.create({
      events_id: id,
    });
  };
 
  process.exit(0);
};

seedDatabase();


