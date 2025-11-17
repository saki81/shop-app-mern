import { publicRequest, userRequest } from "../axiosMethod";
import {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  logoutAction,
} from "./authSlice";


import { setCartFromStorage, persistCart, getCartForUser, switchUserCart } from "./cartRedux";


// ---------------- REGISTER ----------------
export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await userRequest.post("auth/register", user);
    dispatch(registerSuccess(res.data));

    const userId = res.data._id;

    if (userId) {
      try {
        
        await publicRequest.post("cart", { userId, products: [] });

      
        const emptyCart = { products: [], amount: 0, total: 0 };
        getCartForUser(userId, emptyCart);
      

       switchUserCart(userId);
      } catch (cartErr) {
        console.error("Cart creation failed:", cartErr);
      }
    }

    const emptyCart = { products: []};
    persistCart(userId, emptyCart);
    dispatch(setCartFromStorage(emptyCart));

    return { success: true, data: res.data };
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Register failed";
    dispatch(registerFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};
// ---------------- LOGIN ----------------
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post("auth/login", user);
    const loggedUser = res.data;

    dispatch(loginSuccess(loggedUser));

    // 🔹 Fetch guest cart 
    const guestCart = getCartForUser("guest");

    if (guestCart.products && guestCart.products.length > 0) {
      persistCart(loggedUser._id, guestCart); 
      console.log("🛒 Merged guest cart into user cart:", guestCart);
    }

    // 🔹Read user cart from localStorage
    dispatch(switchUserCart({ userId: loggedUser._id }));

    console.log("✅ Login completed — user cart loaded or merged.");
    return { success: true, data: loggedUser };

  } catch (err) {
    const errorMessage = err.response?.data?.message || "Login failed";
    dispatch(loginFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// ---------------- UPDATE USER ----------------
export const updateUser = async (dispatch, userId, userData) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${userId}`, userData);
    dispatch(updateUserSuccess(res.data));
    return { success: true, data: res.data };
  } catch (err) {
    dispatch(updateUserFailure(err.response?.data || "Update failed"));
    return { success: false, error: err.response?.data || "Update failed" };
  }
};

export const logout = (dispatch, currentUser, cart) => {
  const userId = currentUser?._id;

  // 1️⃣Save current cart user
  if (userId) persistCart(userId, cart);


  // 2️⃣ save to guest cart 
  persistCart("guest", cart);

  

  dispatch(logoutAction());

 
  const guestCart = persistCart("guest");
  dispatch(setCartFromStorage(guestCart));


  
  dispatch(switchUserCart({ userId: "guest"}));

  console.log("✅ Logout completed — cart saved and switched to guest cart.");
};














