  
import {createSlice} from "@reduxjs/toolkit";


const saveCartToStorage = (userId, cartState) => {
  const key = `cart_user_${userId || "guest"}`;
  localStorage.setItem(key, JSON.stringify(cartState));
};

const initialState =  {
     products: [],
     amount: 0,
     total: 0,
     lastUpdated: null,
     
     shippingInfo: {
      state: "",
      address: "",
      city: "",
     }
};

const cartSlice = createSlice({ 
   name: "cart",
   initialState,
   products: [],

   reducers: {
    setCartFromStorage: (state, action) => {
      return { ...state, ...action.payload };
    },
     addToCart: (state, action) => {
      
      const { id, size, amount,price,discountedPrice } = action.payload
      const existingProduct = state.products.find((product) =>
      product.id === id && product.size === size );

        if(existingProduct ) {
        existingProduct.amount += amount;
        state.total += (discountedPrice || price) * amount;
        state.amount += amount;
      
      } else {
        state.products.push(action.payload);
        state.amount += amount;
        state.total += (discountedPrice || price) * amount;
      
      }

     },

     incrementAmount: (state, action) => {
      const { id, size,price,discountedPrice } = action.payload;
      const existingProduct = state.products.find((product) => 
      product.id === id && product.size === size && product.price === price && product.discountedPrice === discountedPrice);
      
      if(existingProduct) {
        existingProduct.amount += 1;
        state.total += existingProduct.discountedPrice || existingProduct.price;
        state.amount += 1;
      }
     },
     decrementAmount: (state, action) => {
       const {id, size,price,discountedPrice } = action.payload;
       const existProductIndex = state.products.findIndex((product) => 
       product.id === id && product.size === size && product.discountedPrice === discountedPrice && product.price === price);

       if(existProductIndex !== -1) {
        const existingProduct = state.products[existProductIndex];

        if(existingProduct.amount === 1) {
          state.products.splice(existProductIndex, 1)
        } else {
          existingProduct.amount -= 1
        }
         state.amount -= 1;
         state.total -= existingProduct.discountedPrice || existingProduct.price;
       }
     },
     removeItem: (state, action) => {
      const { id, size } = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === id && product.size === size
      );
    
      if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];
        const productTotalPrice = (existingProduct.discountedPrice || existingProduct.price) * existingProduct.amount;
    
        state.products.splice(existingProductIndex, 1);
        state.amount -= existingProduct.amount;
        state.total -= productTotalPrice;
    }  
  },
     
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => initialState,

    
switchUserCart: (state, action) => {

  const userId = action?.payload?.userId ?? "guest";
  const cartKey = `cart_user_${userId}`;

  const raw = localStorage.getItem(cartKey);

  let cart = { products: [], amount: 0, total: 0 };
  if (raw && raw !== "undefined" && raw !== "null") {
    try {
      const parsed = JSON.parse(raw);
      cart.products = Array.isArray(parsed.products) ? parsed.products : [];
      cart.amount = Number(parsed.amount) || 0;
      cart.total = Number(parsed.total) || 0;
    } catch {
      
      cart = { products: [], amount: 0, total: 0 };
    }
  }
  state.products = cart.products;
  state.amount = cart.amount;
  state.total = cart.total;
  state.lastUpdated = Date.now(); 
},

    clearCart: (state) => {
       state.products = [];
       state.amount = 0;
       state.total = 0; 
    },
  },
});


export const { 
     clearCart, 
     addToCart, 
     removeItem, 
     incrementAmount, 
     decrementAmount,
     saveShippingInfo,
     resetCart,
     forceCartRefresh,
     switchUserCart,
     loadCart,
     store,
     setCartFromStorage
        } = cartSlice.actions;

export default cartSlice.reducer;

export const persistCart = (userId, cartState) => {
  saveCartToStorage(userId, cartState);
};

export const getCartForUser = (userId) => {
  const key = `cart_user_${userId}`;
  const data = localStorage.getItem(key);

  if (!data || data === "undefined" || data === "null") {
    return { products: [], amount: 0, total: 0 };
  }

  try {
    const parsed = JSON.parse(data);
    return {
      products: Array.isArray(parsed.products) ? parsed.products : [],
      amount: Number(parsed.amount) || 0,
      total: Number(parsed.total) || 0,
    };
  } catch(err) {
    return { products: [], amount: 0, total: 0 };
  
  }
};




 
     












     
 





