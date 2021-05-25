const User = require('./User');
const Events = require('./Events');
const Memberships = require('./Memberships');





User.associate = (models) => {
  User.belongsToMany(models.Membership, {
    through: 'Memberships',
    as: 'Events',
    foreignKey: 'userId'
  });
};

Events.associate = (models) => {
  Events.belongsToMany(models.User, {
    through: 'Memberships',
    as: 'User',
    foreignKey: 'eventsId'
  });
};


module.exports = { User, Events, Memberships };