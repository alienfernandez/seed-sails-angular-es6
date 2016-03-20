import commonModule from '../commonModule';
import Constant from '../components/core/Constant';

var constants = {
    app: {
        title: 'MEANRR.ES6',
        description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, Node.js, React.js and Redis',
        keywords: 'MongoDB, Express, AngularJS, Node.js, React.js, Redis'
    },
    port: 8000,
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
