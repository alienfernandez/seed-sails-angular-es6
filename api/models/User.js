var _ = require('lodash');
var crypto = require('crypto');

/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      index: true
    },
    firstName: {
      type: 'string',
      defaultsTo: ''
    },
    lastName: {
      type: 'string',
      defaultsTo: ''
    },
    displayName: {
      type: 'string'
    },
    email: {
      type: 'string',
      unique: true,
      defaultsTo: ''
    },
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    jid: {
      type: 'string',
      unique: true,
      required: true
    },
    jidPassword: {
      type: 'string',
      defaultsTo: ''
    },
    salt: {
      type: 'string'
    },
    profileImageURL: {
      type: 'string',
      defaultsTo: 'default.png'
    },
    passports: {
      collection: 'Passport',
      via: 'user'
    },
    /* For reset password */
    resetPasswordToken: {
      type: 'string'
    },
    resetPasswordExpires: {
      type: 'date'
    },

    getGravatarUrl: function () {
      var md5 = crypto.createHash('md5');
      md5.update(this.email || '');
      return 'https://gravatar.com/avatar/' + md5.digest('hex');
    },

    toJSON: function () {
      var user = this.toObject();
      delete user.password;
      user.gravatarUrl = this.getGravatarUrl();
      return user;
    }

  },
  beforeCreate: function (user, next) {
    if (_.isEmpty(user.username)) {
      user.username = user.email;
    }
    next();
  },

  /**
   * Register a new User with a passport
   */
  register: function (user) {
    return new Promise(function (resolve, reject) {
      sails.services.passport.protocols.local.createUser(user, function (error, created) {
        if (error) return reject(error);

        resolve(created);
      });
    });
  }
};

