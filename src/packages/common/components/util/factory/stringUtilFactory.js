import commonModule from '../../../commonModule';

class StringUtilFactory {

    constructor() {
    }

    /*ngInject*/
    static instance() {
        return new StringUtilFactory();
    }

    /**
     * Clean special chars
     * @param str
     * @returns {*}
     */
    cleanUpSpecialChars(str) {
        var cleanStr = this.stripSpecialChars(str);
        return cleanStr;
    }

    /**
     * Strip special chars
     * @param str
     * @returns {*}
     */
    stripSpecialChars(str) {
        var translate_re = /[ŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ]/g;
        var translate = 'SOZsozYYuAAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy';
        return (str.replace(translate_re, function (match) {
                return translate.substr(translate_re.source.indexOf(match) - 1, 1);
            })
        );
    }
}

commonModule.factory('StringUtil', StringUtilFactory.instance);

export default commonModule;
