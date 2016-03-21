import commonModule from '../commonModule';
import Constant from '../components/core/Constant';

var constants = {
  app: {
    title: 'SAILS.ES6',
    description: 'Full-Stack JavaScript with Sails Frameworks',
    keywords: 'Sails.js, AngularJS, Node.js, React.js, Redis'
  },
  port: 1337,
  local_store: {
    prefix: 'app_storage',
    type: {
      local_storage: 'localStorage',
      session_storage: 'sessionStorage'
    }
  }
}

const appConstant = new Constant(constants);
commonModule.constant('$appConstants', appConstant);

export default commonModule;
