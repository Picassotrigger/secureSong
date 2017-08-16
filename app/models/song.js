module.exports = function(sequelize, Sequelize) {

  var Song = sequelize.define('song', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    songname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    artistname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    genre: {
      type: Sequelize.TEXT
    },

    cliplink: {
      type: Sequelize.TEXT
    }

  });

  return Song;
}
