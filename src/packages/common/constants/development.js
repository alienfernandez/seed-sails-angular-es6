import commonModule from '../commonModule';
import Constant from '../components/core/Constant';

var devConstants = {
    app: {
        title: 'MEANRR.ES6',
        description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, Node.js, React.js and Redis',
        keywords: 'MongoDB, Express, AngularJS, Node.js, React.js, Redis'
    },
    port: 8000,
    server: 'http://meanrr',
    local_store: {
        prefix: 'app_storage',
        type: {
            local_storage: 'localStorage',
            session_storage: 'sessionStorage'
        }
    },
    xmpp: {
        "domain": "meanrr",
        "boshHttpService": "http://meanrr/http-bind/"
    }
}

const appDevConstant = new Constant(devConstants);
commonModule.constant('$appConstants', appDevConstant);

export default commonModule;
