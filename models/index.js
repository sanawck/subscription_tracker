// const { DataTypes } = require('sequelize/types');
// const sequelize = require('../config/connection');
// const DataTypes = 
const User = require('./User'); //sequelize.define('user', {});
const Events = require('./Events');   //sequelize.define('events', {});
const Memberships = require('./Memberships');            //sequelize.define('memberships', {
  //status: DataTypes.STRING
//});

// User.belongsToMany(Events, { as: "Groups", through: "memberships", foreignKey: "user_id"})
// Events.belongsToMany(User, { as: "Members", through: "memberships", foreignKey: "events_id"})

// User.belongsToMany(Events, { as: "Groups", through: "memberships", foreignKey: "user_id", otherKey: "events_id" })



// User.associate = (models) => {
User.belongsToMany(Events, {
  through: {
    model: Memberships,
    unique: false,
  },
  as: "memberships",
  foreignKey: "user_id",
});
// };

// Events.associate = (models) => {
Events.belongsToMany(User, {
  through: {
    model: Memberships,
    unique: false,
  },
  as: "participants",
  foreignKey: "events_id",
});
// };

module.exports = { User, Events, Memberships };

// const User = require('./User');
// const Events = require('./Events');

// User.hasMany(Events, {
//   foreignKey: 'user_id',
//   // onDelete: 'CASCADE'
// });

// Events.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// module.exports = { User, Events };

