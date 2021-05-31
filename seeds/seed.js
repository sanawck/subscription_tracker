const sequelize = require('../config/connection');
const User = require('../models/User');
const Events = require('../models/Events');
const Memberships = require('../models/Memberships');

const userData = require('./userData.json');
const eventsData = require('./eventsData.json');
const membershipsData = require('./membershipsData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const events = await Events.bulkCreate(eventsData)

  for (const { id } of user) {
    const userId = await Memberships.create({
      user_id: id,
    });
  }

  for (const { id } of events) {
    const eventId = await Memberships.create({
      events_id: id,
    });
  }
  
  for (events of eventsData) {
  await Memberships.create({
    ...events,
    events_id: user[Math.floor(Math.random() * user.length)].id,
  });
}
  
  process.exit(0);
};

seedDatabase();


