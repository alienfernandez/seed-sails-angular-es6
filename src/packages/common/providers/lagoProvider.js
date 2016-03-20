import angular from 'angular';
import commonModule from '../commonModule';

let _parent = '';

class lagoProvider {

    constructor() {

    }

    parent(newParent) {
        return arguments.length ? (_parent = newParent) : _parent + '.';
    }

    $get() {
        return {
            parent: _parent + '.'
        };
    }
}

commonModule.provider('lago', lagoProvider);
export default commonModule;
