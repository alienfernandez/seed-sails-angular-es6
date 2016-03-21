import commonModule from '../commonModule';
import Constant from '../components/core/Constant';

var prodConstants = {
  app: {
    title: 'SAILS.ES6',
    description: 'Full-Stack JavaScript with Sails Frameworks',
    keywords: 'Sails.js, AngularJS, Node.js, React.js, Redis'
  },
  port: 443,
  server: 'https://localhost',
  secure: {
    ssl: true,
    privateKey: './config/sslcerts/key.pem',
    certificate: './config/sslcerts/cert.pem'
  },
  local_store: {
    prefix: 'app_storage',
    type: {
      local_storage: 'localStorage',
      session_storage: 'sessionStorage'
    }
  },
  xmpp: {
    "domain": "localhost",
    "boshHttpService": "http://localhost/http-bind/"
  }
}

const appProdConstant = new Constant(prodConstants);

commonModule.constant('$appConstants', appProdConstant);
//commonModule.value('prodConstants', prodConstants);

export default commonModule;
