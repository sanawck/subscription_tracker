const User = require("./User");
const Events = require("./Events");
const Memberships = require("./Memberships");

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
