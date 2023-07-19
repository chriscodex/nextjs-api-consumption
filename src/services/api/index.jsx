const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/${VERSION}/auth/login`,
    profile: `${API}/${VERSION}/auth/profile`,
    refreshToken: `${API}/${VERSION}/auth/refresh-token`,
  },
  products: {
    getProducts: `${API}/${VERSION}/products`,
    postProducts: `${API}/${VERSION}/products`,
    getProduct: (id) => `${API}/${VERSION}/products/${id}`,
    putProduct: (id) => `${API}/${VERSION}/products/${id}`,
    deleteProduct: (id) => `${API}/${VERSION}/products/${id}`,
  },
  users: {
    getUsers: `${API}/${VERSION}/users`,
    postUsers: `${API}/${VERSION}/users`,
    getUser: (id) => `${API}/${VERSION}/users/${id}`,
    putUser: (id) => `${API}/${VERSION}/users/${id}`,
    deleteUser: (id) => `${API}/${VERSION}/users/${id}`,
    isAvailable: `${API}/${VERSION}/users/is-available`,
  },
  categories: {
    getCategories: `${API}/${VERSION}/categories`,
    postCategories: `${API}/${VERSION}/categories`,
    getCategory: (id) => `${API}/${VERSION}/categories/${id}`,
    putCategory: (id) => `${API}/${VERSION}/categories/${id}`,
    deleteCategory: (id) => `${API}/${VERSION}/categories/${id}`,
    productsCategory: (id) => `${API}/${VERSION}/categories/${id}/products`,
  },
  files: {
    getFile: (fileName) => `${API}/${VERSION}/files/${fileName}`,
    postFile: `${API}/${VERSION}/files/upload`,
  },
};

export default endPoints;
