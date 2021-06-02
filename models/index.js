const User = require('./User'); //sequelize.define('user', {});
const Events = require('./Events');   //sequelize.define
const Memberships = require('./Memberships');
const sequelize = require('../config/connection')

// User.belongsTo(User)
// User.hasMany(Events)
// Events.belongsTo(User)
///?? 
User.belongsToMany(Events, {
    as: 'members', 
    through: Memberships,
      unique: false,
      foreignKey: "userId" 
});


Events.belongsToMany(User, { 
    as: 'participants', 
    through: Memberships,
      unique: false,
      foreignKey: "eventsId" 
});



// User.belongsToMany(User, { as: 'Friends', through: 'friends' });
// User.belongsToMany(User, { as: 'Requesters', through: 'requests', foreignKey: 'requesterId', onDelete: 'CASCADE' })
// User.belongsToMany(User, { as: 'Requestees', through: 'requests', foreignKey: 'requesteeId', onDelete: 'CASCADE' })



module.exports = { Memberships, Events, User };


