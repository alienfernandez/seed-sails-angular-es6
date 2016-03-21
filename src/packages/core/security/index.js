import securityModule from './securityModule';

//Import styles
import './assets/css/users.min.css!';

//Services
import './services/authenticationService';
import './services/securityService';
import './services/userService';
//import './services/usersService';

//Controllers
import './controllers/securityController';
import './controllers/passwordController';
import './controllers/userController';
import './controllers/profileController';
import './controllers/socialAccountController';

export default securityModule;
