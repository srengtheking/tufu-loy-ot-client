import api from "./api";

const BASE = "/admin/products";

export function getProducts() {
    return api.get(BASE).then((response) => response.data);
}

export function getProduct(id) {
    return api.get(`${BASE}/${id}`).then((response) => response.data);
}
