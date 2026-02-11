import axios from "./axios";
import qs from "qs";

const registerAPI = async (
    name: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
) => {
    const url = "/api/register";
    return await axios.post(url, {
        name,
        username,
        email,
        password,
        confirmPassword,
    });
};
const loginAPI = async (username: string, password: string) => {
    const url = "/api/login";
    return await axios.post(url, { username, password });
};

const logoutAPI = async () => {
    const url = "/api/logout";
    return await axios.post(url);
};

const fetchAccountAPI = async () => {
    const url = "/api/account";
    const res = await axios.get(url);
    return res;
};
const getUsersAPI = async () => {
    const url = "/api/users";
    return await axios.get(url);
};

// cart
const fetchCartAPI = async () => {
    const url = "/api/cart";
    return await axios.get(url);
};

const addToCartAPI = async (productId: number, quantity: number) => {
    const url = "/api/cart";
    return await axios.post(url, { productId, quantity });
};

const updateCartItemAPI = async (cartItemId: number, quantity: number) => {
    const url = "/api/cart";
    return await axios.put(url, { cartItemId, quantity });
};

const emptyCartAPI = async () => {
    const url = "/api/cart/empty";
    return await axios.post(url);
};

const getProductsAPI = async (
    searchTerm: string,
    page: number,
    pageSize: number,
    inStockOnly: boolean,
    brands?: string[],
    targets?: string[],
    priceRange?: [number, number],
    sort?: string,
) => {
    let url = "/api/products";
    return await axios.get(url, {
        params: {
            searchTerm,
            page,
            pageSize,
            brands,
            targets,
            priceRange,
            inStockOnly,
            sort,
        },
        paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
    });
};

const getProductAPI = async (id: number) => {
    let url = `/api/products/${id}`;
    return await axios.get(url);
};

const createProductAPI = async (formData: FormData) => {
    let url = `/api/products`;
    return await axios.post(url, formData, {
        headers: { "Content-Type": "application/multipart" },
    });
};

const deleteProductAPI = async (id: number) => {
    return await axios.delete(`/api/products/${id}`);
};

const deleteUserAPI = async (id: number) => {
    return await axios.delete(`/api/users/${id}`);
};

const createOrderAPI = async (
    name: string,
    address: IAddress,
    email: string,
    totalPrice: number,
    orderItems: any[],
    paymentDetails: IPaymentDetails,
) => {
    return await axios.post("/api/orders", {
        name,
        address,
        email,
        totalPrice,
        orderItems,
        paymentDetails,
    });
};

const getOrdersByUserAPI = async () => {
    const res = await axios.get('/api/orders/user');
    return res;
};

export {
    createProductAPI,
    deleteProductAPI,
    createOrderAPI,
    emptyCartAPI,
    updateCartItemAPI,
    addToCartAPI,
    fetchCartAPI,
    loginAPI,
    fetchAccountAPI,
    deleteUserAPI,
    getProductAPI,
    getUsersAPI,
    getProductsAPI,
    registerAPI,
    logoutAPI,
    getOrdersByUserAPI,
};
