/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * @override
   */
  create: function (req, res, next) {
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err) return res.negotiate(err);

      res.ok(user);
    });
  },

  me: function (req, res) {
    res.ok(req.user);
  }
};

