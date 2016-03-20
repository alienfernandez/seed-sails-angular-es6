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
            type: 'string',
            trim: true
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
        password: {
            type: 'string',
            defaultsTo: ''
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
        provider: {
            type: 'string',
            required: true
        },
        /* For reset password */
        resetPasswordToken: {
            type: 'string'
        },
        resetPasswordExpires: {
            type: 'date'
        }

    }
};

