import systemModule from './systemModule';

//Import css
import './assets/css/core.min.css!';

//Services
import './services/interceptors/authInterceptorService';
import './services/socketIoService';
import './services/systemService';

//Controllers
import './controllers/homeController';
import './controllers/componentsController';
import './controllers/controlPanelController';
import './controllers/systemController';
import './controllers/adminController';

//Directives
//import './directives/headerDirective';
//import './directives/contentDirective';

export default systemModule;
