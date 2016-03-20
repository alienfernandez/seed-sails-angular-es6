/**
 * Constant class
 */
class Constant {
    constructor(enumLiterals) {
        for (let key in enumLiterals) {
            if (Object.is(enumLiterals[key], undefined)) {
                throw new Error('Each property should have at least one value');
            }
            Object.defineProperty(this, key, {
                get: function () {
                    if (Object.is(enumLiterals[key], Object)) {
                        return Object.freeze(enumLiterals[key]);
                    }
                    return enumLiterals[key];
                }
            });
        }
        Object.freeze(this);
    }
}

export default Constant;
