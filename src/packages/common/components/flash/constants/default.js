import commonModule from '../../../commonModule';
import Constant from '../../../components/core/Constant';

let flashConst = {
    POSITION: {
        BOTTOM_CENTER: {cls: 'toast-bottom-center', value: 0},
        BOTTOM_FULL_WIDTH: {cls: 'toast-bottom-full-width', value: 1},
        BOTTOM_LEFT: {value: 'toast-bottom-left', value: 2},
        BOTTOM_RIGHT: {cls: 'toast-bottom-right', value: 3},
        TOP_CENTER: {cls: 'toast-top-center', value: 4},
        TOP_FULL_WITH: {cls: 'toast-top-full-width', value: 5},
        TOP_LEFT: {cls: 'toast-top-left', value: 6},
        TOP_RIGHT: {cls: 'toast-top-right', value: 7}
    },
    MESSAGE_TYPE: {
        SUCCESS: {
            NAME: "Success",
            CODE: 1
        },
        INFO: {
            NAME: "Info",
            CODE: 2
        },
        WARNING: {
            NAME: "Warning",
            CODE: 3
        },
        ERROR: {
            NAME: "Error",
            CODE: 4
        }
    }
}

const flashConstant = new Constant(flashConst);

commonModule.constant('$flashConstants', flashConstant);

export default commonModule;
