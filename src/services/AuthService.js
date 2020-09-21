import ApiService from './ApiService';

const apiService = new ApiService();

class AuthService {
    constructor(apiService) {
        this._apiService = apiService;
        this._accountActivateUrl = '/auth/account/activate/';
        this._checkTokenUrl = '/auth/token/check';
        this._localStorageItemName = 'at';
        this._loginUrl = '/auth/login';
        this._registrationUrl = '/auth/register';
        this._logoutUrl = '/auth/logout';
        this._passwordFindUrl = '/auth/password/find/';
        this._resetPasswordUrl = '/auth/password/reset';
        this._sendResetPasswordLink = '/auth/password/create';
        this._setCredentialsUrl = '/auth/credentials/create';
        this._tokenPrefix = 'Bearer ';
    }

    async accountActivate(hash) {
        const url = this._accountActivateUrl + hash;

        return await this._apiService.postResource(url);
    }

    async checkAuthToken(token) {
        const url = this._checkTokenUrl;

        const headers = {
            "Authorization": this._tokenPrefix + token
        };

        return await this._apiService.postResource(url, {}, headers);
    }

    async checkHash(hash) {
        const url = this._passwordFindUrl + hash;

        return await this._apiService.getResource(url);
    }

    async login(credentials) {
        const url = this._loginUrl;

        return await this._apiService.postResource(url, credentials);
    }

    async logout() {
        const url = this._logoutUrl;
        const headers = {
            "Authorization": this._tokenPrefix + this.getAuthToken()
        };

        return await this._apiService.postResource(url, {}, headers);
    }

    async register(credentials) {
        const url = this._registrationUrl;

        return await this._apiService.postResource(url, credentials);
    }

    async resetPassword(credentials) {
        const url = this._resetPasswordUrl;

        return await this._apiService.postResource(url, credentials);
    }

    async sendResetPasswordEmail(credentials) {
        const url = this._sendResetPasswordLink;

        return await this._apiService.postResource(url, credentials);
    }

    getApiService() {
        return this._apiService;
    }

    getAuthHeader() {
        return {
            Authorization: this._tokenPrefix + this.getAuthToken()
        }
    }

    getLocalStorageItemName() {
        return this._localStorageItemName;
    }

    getLoginUrl() {
        return this._loginUrl;
    }

    getAuthToken() {
        return localStorage.getItem(this._localStorageItemName);
    }

    getTokenPrefix() {
        return this._tokenPrefix;
    }

    resetAuthToken() {
        localStorage.setItem(this._localStorageItemName, '');
    }

    setAuthToken(token) {
        localStorage.setItem(this._localStorageItemName, token);
    }

    setCredentials(credentials) {
        return this._apiService.postResource(this._setCredentialsUrl, credentials, this.getAuthHeader())
    }
}

const authService = new AuthService(apiService);

export default authService;
