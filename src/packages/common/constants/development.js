import commonModule from '../commonModule';
import Constant from '../components/core/Constant';

var devConstants = {
  app: {
    title: 'SAILS.ES6',
    description: 'Full-Stack JavaScript with Sails Frameworks',
    keywords: 'Sails.js, AngularJS, Node.js, React.js, Redis'
  },
  port: 1337,
  server: 'http://localhost',
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

const appDevConstant = new Constant(devConstants);
commonModule.constant('$appConstants', appDevConstant);

export default commonModule;
