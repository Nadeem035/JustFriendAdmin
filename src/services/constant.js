export default class Constants {
  static BASE_URL = "http://144.91.80.25:4005/";
  static END_POINT = {
    SIGIN: "api/admin/signin",

    GET_ALL_USERS: "api/admin/allusers",
    USER: "api/admin/user/",
    REPORTED_USERS: "api/admin/allreportedusers",

    FOUNDATION: "api/foundation/",

    GET_CATEGORY: "api/admin/category/",
    CREATE_CATEGORY: "api/admin/createItemCategory",
    UPDATE_CATEGORY: "api/admin/updatecategory/",

    SUB_CATEGORY: "api/admin/subcategory/",

    REPORTED_REVIEWS: "api/admin/reportedreviews/",

    PRODUCT: "api/admin/product/",
    PRODUCTS: "api/admin/products",
    USER_PRODUCT: "api/admin/user/products/",
    CATEGORY_PRODUCT: "api/admin/category/products/",
    UPDATE_PRODUCT: "api/admin/product/update/",

    PAYMENT: "api/admin/payments/",
  };
}
