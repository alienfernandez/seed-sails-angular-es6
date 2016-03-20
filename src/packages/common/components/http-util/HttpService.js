/**
 * Http services
 */
class HttpService {

    /**
     * Constructor
     * @param $http
     * @param lodash
     */
    constructor($http, lodash) {
        this.http = $http;
        this._ = lodash;
    }

    /**
     * Get query string
     * @param url
     * @param attributes
     * @returns {*}
     */
    getQueryString(url, attributes = {}) {
        if (!this._.isEmpty(attributes)) {
            //Query string parameters
            let params = Object.keys(attributes).map((key) => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(attributes[key])}`;
            }).join('&');

            url += `?${params}`;
        }
        return url;
    }

    /**
     * It allows you to request GET
     * @param uri
     * @param attributes
     * @returns {Promise}
     */
    get(url, attributes = {}) {
        //Promise that runs when you have service response
        return new Promise((resolve, reject) => {
            //Get query string
            url = this.getQueryString(url, attributes);

            //Headers
            let config = {
                headers: {
                    'Accept': 'application/json; charset=utf-8'
                }
            };
            //Http request GET
            this.http.get(url, config)
                .success(response => {
                    resolve(response);
                })
                .error((error, status) => {
                    reject({
                        message: error,
                        data: null
                    });
                });
        });
    }

    /**
     * It allows you to request JSONP
     * @param url
     * @param attributes
     * @returns {Promise}
     */
    jsonp(url, attributes = {}) {
        return new Promise((resolve, reject) => {
            //Add callback function
            attributes.callback = "JSON_CALLBACK";
            //Get query string
            url = this.getQueryString(url, attributes);
            //Http request JSONP
            this.http.jsonp(url)
                .success((response) => {
                    resolve(response);
                })
                .error((error) => {
                    reject({
                        message: error,
                        data: null
                    });
                });
        });
    }

    /**
     * It allows you to request POST
     * @param url
     * @param parameters
     * @param isMultipart
     * @returns {Promise}
     */
    post(url, parameters = {}, isMultipart = false) {
        return new Promise((resolve, reject) => {
            let headers = {};
            if (isMultipart) {
                //multipart/form-data
                headers = {headers: {'Content-Type': undefined}}
            }

            //Http request POST
            this.http.post(url, parameters, headers)
                .success(response => {
                    resolve(response);
                })
                .error((error) => {
                    reject({
                        message: error,
                        data: null
                    });
                });
        });
    }
}

export default HttpService;
