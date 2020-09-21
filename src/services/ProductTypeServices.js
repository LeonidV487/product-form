import AuthService from './AuthService';
import ApiService from "./ApiService";

class ProductTypeServices extends ApiService {
    constructor(authService) {
        super();
        this._authService = authService;
        this._getProductsType = '/product_types';
    }

    getProducts() {
        return this.getResource(this._getProductsType);
    }
}

const productTypeServices = new ProductTypeServices(AuthService);

export default productTypeServices;
