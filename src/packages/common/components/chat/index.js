import './assets/css/chat.min.css!';

//Import constants
import './constants/default';

//Import controllers
import './controllers/chatboxController';
import './controllers/chatboxMessageController';

//Import directives
import './directives/chatDirective';
import './directives/chatMessageDirective';

//Import providers and services
import './provider/chatBoxFactory';

//Import xmpp core
import './im-xmpp/core/xmpp-core-stanza';
import './im-xmpp/core/xmpp-core-event-strophe';
import './im-xmpp/core/xmpp-core-event-jabber';
import './im-xmpp/core/xmpp-core';
import './im-xmpp/services/xmpp-service';