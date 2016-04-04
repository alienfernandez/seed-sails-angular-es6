/**
 * PasswordController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * Module dependencies.
 */
var path = require('path'),
  async = require('async'),
  crypto = require('crypto');

module.exports = {

  /**
   * @override
   */
  forgot: function (req, res, next) {
    async.waterfall([
      // Generate random token
      function (done) {
        crypto.randomBytes(20, function (err, buffer) {
          var token = buffer.toString('hex');
          done(err, token);
        });
      },
      // Lookup user by username
      function (token, done) {
        if (req.body.username) {
          sails.models.user.findOne({
            username: req.body.username.toLowerCase()
          }).then(function (user) {
            if (!user) {
              return res.status(400).send({
                message: 'No account with that username has been found'
              });
            } else if (user.provider !== 'local') {
              return res.status(400).send({
                message: 'It seems like you signed up using your ' + user.provider + ' account'
              });
            } else {
              user.resetPasswordToken = token;
              user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

              //Update user!!!
              //user.update(function (err) {
              //  done(err, token, user);
              //});
              //User.update({name:'Walter Jr'},{name:'Flynn'}).exec(function afterwards(err, updated){
              //  if (err) {
              //    // handle error here- e.g. `res.serverError(err);`
              //    return;
              //  }
              //  console.log('Updated user to have name ' + updated[0].name);
              //});
            }
          })
            .catch(next);
        } else {
          return res.status(400).send({
            message: 'Username field must not be blank'
          });
        }
      },
      //function (token, user, done) {
      //
      //  var httpTransport = 'http://';
      //  //if (config.secure && config.secure.ssl === true) {
      //  //  httpTransport = 'https://';
      //  //}
      //  res.render(path.resolve('.tmp/public/app/packages/security/server/templates/reset-password-email'), {
      //    name: user.displayName,
      //    appName: sails.config.app.title,
      //    url: httpTransport + req.headers.host + '/api/auth/reset/' + token
      //  }, function (err, emailHTML) {
      //    done(err, emailHTML, user);
      //  });
      //},
      // If valid email, send reset email using service
      function (token, user, done) {
        var httpTransport = 'http://';
        sails.hooks.email.send(
          "reset-password-email",
          {
            name: user.displayName,
            appName: sails.config.app.title,
            url: httpTransport + req.headers.host + '/api/auth/reset/' + token
          },
          {
            to: user.email,
            subject: 'Password Reset'
          },
          function (err) {
            console.log(err || "It worked!");
            if (!err) {
              res.send({
                message: 'An email has been sent to the provided email with further instructions.'
              });
            } else {
              var msgError = "Failure sending email";
              if (err.code == 'EAUTH') {
                msgError += ": Invalid login";
              }
              return res.status(400).send({
                message: msgError
              });
            }

            done(err);
          }
        );
      }
    ], function (err) {
      if (err) {
        return next(err);
      }
    });
  }
};

