import api from "./api";

const BASE = "/admin/categories";

export function getCategories() {
    return api.get(BASE).then((response) => response.data);
}

export function getCategory(id) {
    return api.get(`${BASE}/${id}`).then((response) => response.data);
}
