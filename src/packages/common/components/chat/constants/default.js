import commonModule from '../../../commonModule';
import Constant from '../../../components/core/Constant';

var chatConstants = {
    IM_BOSH_SERVICE: 'http://localhost/xmpp-httpbind/',
    IM_LOG_LINES: 300,
    IM_LOG_LEVEL: 1, //0=debug, 1=info, 2=warn, 3=error, 4=fatal
    IM_NAME: 'ChatXMPP',
    IM_VERSION: 1,
    SESSION_STORE_DATA: 'chat_xid_data'
}

const appChatConstant = new Constant(chatConstants);
commonModule.constant('$chatConstants', appChatConstant);

export default commonModule;
