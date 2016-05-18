import systemModule from './systemModule';

//Import css
import './assets/css/core.min.css!';

//Services
import './services/interceptors/authInterceptorService';
import './services/socketIoService';
import './services/systemService';

//Controllers
import './controllers/homeController';

//Directives
//import './directives/headerDirective';
//import './directives/contentDirective';

export default systemModule;
