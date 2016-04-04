/**
 * Default app config
 * (sails.config.xmpp)
 *
 */

module.exports.xmpp = {

  "domain": "sails-es6",
  "boshHttpService": "http://sails-es6/http-bind/",
  "adminHttpService": "http://sails-es6:9090/",
  "api": {
    "secretKey": "pXnyrebF5ys8Suv3",
    "path": {
      "users": "plugins/restapi/v1/users"
    }
  }
};
