/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /**
   * `AuthController.signin()`
   */
  signin: function (req, res, next) {
    var id = req.param('username');
    console.log("id", id);
    if (id) {
      Articles.findOne(id, function (err, article) {
        if (article === undefined) return res.notFound();

        if (err) return next(err);

        res.json(article);
      })
    }
  }

};

