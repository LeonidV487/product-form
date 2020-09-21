import axios from 'axios';

class ApiService {
    constructor() {
        this._axios = axios;
        this._locale = 'ru';
    }

    getLangHeader() {
        return this._locale ? {'X-Localization' : this._locale} : {};
    }

    getResource(url) {
        return this._axios.get(this.getApiPrefix() + url)
    }

    postResource(url, params, headers) {
        if (headers) {
            return this._axios.post(this.getApiPrefix() + url, params, {headers: headers});
        } else {
            return this._axios.post(this.getApiPrefix() + url, params);
        }
    }

    getApiPrefix() {
        return '/api'
    }

    setLocale(locale) {
        this._locale = locale;

        return this;
    }

    setRequestHeaders(headers) {
        Object.keys(headers).map((key) => {
            this._axios.defaults.headers.common[key] = headers[key];
        })
    }
}

export default ApiService;
