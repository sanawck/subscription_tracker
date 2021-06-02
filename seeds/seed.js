const sequelize = require('../config/connection');
const User = require('../models/User');
const Events = require('../models/Events');
const Memberships = require('../models/Memberships');

const userData = require('./userData.json');
const eventsData = require('./eventsData.json');
const membershipsData = require('./membershipsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
try {
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  //const { id } is block scoped
  // for (const { id } of user) {
  //   const memberships = await Memberships.create({
  //     user_id: id,
  //   });
  // }

  // for (i = 0; i < user.length; i++) {
  // }

  await Events.bulkCreate(eventsData);
 await Memberships.bulkCreate(membershipsData);
  // for (const { id } of events) {
  //   memberships = await Memberships.create({
  //     events_id: id,
  //   });
  // };
} catch (err) {
  if (err) throw err
}
  process.exit(0);
};

seedDatabase();


