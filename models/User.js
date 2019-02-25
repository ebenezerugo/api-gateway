const bcrypt = require('bcrypt');

const Sequelize = require('sequelize');
const sequelise = require("../config/database");

const User = sequelise.define('users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
    
});

User.beforeCreate(async(data, options) => {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(data.password, salt);

    data.password = passwordHash;
});

User.prototype.isValidPassword = async function(newPassword) {
    try {
      return await bcrypt.compare(newPassword, this.password);
    } catch(error) {
      throw new Error(error);
    }
  }

module.exports = User;