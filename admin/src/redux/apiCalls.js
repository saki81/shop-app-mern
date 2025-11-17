import { loginFailure, 
         loginStart, 
         loginSuccess, 
         logout,
         } from "./authRedux";
import { publicRequest, userRequest } from "../axiosMethod";
import { 
         getProductsStart, 
         getProductsSuccess, 
         getProductsFailure,
         deleteProductsStart,
         deleteProductsSuccess,
         deleteProductsFailure,
         updateProductStart,
         updateProductSuccess,
         updateProductFailure, 
         addProductStart,
         addProductSuccess,
         
         addProductFailure,} from "./productRedux";
import {
         getUsersStart,
         getUsersSuccess,
         getUsersFailure,
         deleteUserStart,
         deleteUserSuccess,
         deleteUserFailure,
         updateUserStart,
         updateUserSuccess,
         updateUserFailure,
         addUserStart,
         addUserSuccess,
         addUserFailure
} from "./userListRedux";
import {
         getOrdersStart,
         getOrdersSuccess,
         getOrdersFailure,
         getOrderStart,
         getOrderSuccess,
         getOrderFailure,
         updatedOrderStatusStart,
         updatedOrderStatusSuccess,
         updatedOrderStatusFailure

} from "./orderRedux";

// LOGIN
export const login = async (dispatch, user) => {
  
  dispatch(loginStart());
  try {
     const res = await publicRequest.post("/auth/login", user);
     dispatch(loginSuccess(res.data));
  
    } catch (err) {
     dispatch(loginFailure(err.response?.data?.message || "Login failed"));
  }
};
// PRODUCTS
export const getProducts = async (dispatch, page = 1, limit = 9) => {
  console.log("Poziv API-ja sa page:", page); 
    dispatch(getProductsStart())
  try {
    const res = await publicRequest.get(`/products?page=${page}&limit=${limit}`)
    console.log("API Response:", res.data); 
      dispatch(getProductsSuccess({
       products: res.data.products,
       currentPage: res.data.currentPage,
       totalPage: res.data.totalPage
      }))
  } catch (error) {
    dispatch(getProductsFailure());
  }
};

export const deleteProducts =  async (id,dispatch) => {
    dispatch(deleteProductsStart())
  try {
    const res = await userRequest.delete(`/products/${id}`)
    dispatch(deleteProductsSuccess(id))
    console.log("Uspešno izbrisano:", id);
  } catch (error) {
    dispatch(deleteProductsFailure())
  }
};

export const updateProduct = async (id, product, dispatch) => {

    dispatch(updateProductStart());
  try {
  
    const res = await userRequest.put(`/products/${id}`, product)
    dispatch(updateProductSuccess({id, product: res.data }))
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const addProducts = async (product, dispatch) => {
    dispatch(addProductStart())

  try {
    console.log('Send request for create product', product); 
    const res = await userRequest.post(`/products`, product );
    console.log('Server response', res.data); 
    dispatch(addProductSuccess(res.data))
  } catch (error) {
    console.error('Error create product', error.response || error.message); 
    dispatch(addProductFailure());

    if (error.response && error.response.data) {
      dispatch(addProductFailure(error.response.data.error || 'Unknown error'));
    } else {
      
      dispatch(addProductFailure('Unknown error'));
    }
   }
  };
// USERS
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart())
  try {
    const res = await userRequest.get("/users")
    dispatch(getUsersSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getUsersFailure())
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart())
  try {
    const res = await userRequest.delete(`/users/${id}`)
    dispatch(deleteUserSuccess(id))
  } catch (error) {
    dispatch(deleteUserFailure())
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart())
  try {
    const res = await userRequest.put(`/users/${id}`, {...user})
    dispatch(updateUserSuccess({id, user}))
  } catch (error) {
    dispatch(updateUserFailure())
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/users`, user)
    dispatch(addUserSuccess(res.data))
    console.log(res)
  } catch (error) {
    dispatch(addUserFailure())
  }
}

export const logoutUser = (dispatch) => {
  dispatch(logout());
  localStorage.removeItem("auth")
}
// ORDERS
export const getOrders = async (dispatch) => {
  dispatch(getOrdersStart());
  try {
    const res = await userRequest.get("/orders")
    console.log("API Response:", res.data);  // Proveri šta API vraća
    dispatch(getOrdersSuccess(res.data))
    
    return res.data
  } catch (error) {
    dispatch(getOrdersFailure())
  }
}
// ORDER ID
export const getOrder = (orderId) => async (dispatch) => {
  dispatch(getOrderStart())
 
  try {
     const res = await userRequest.get(`orders/${orderId}`)
     console.log(`Order fetched successfully:`, res.data);
     dispatch(getOrderSuccess( res.data))
  } catch (error) {
     dispatch(getOrderFailure())
  }
};
// ORDER ID CHANGE STATUS
export const updatedOrderStatus = async (dispatch,orderId,status) => {
  dispatch(updatedOrderStatusStart());
  try {
    const res = await userRequest.put(`/orders/${orderId}/status`,{status})
  
    dispatch(updatedOrderStatusSuccess(res.data))
  } catch (error) {
    dispatch(updatedOrderStatusFailure())
  }
};



