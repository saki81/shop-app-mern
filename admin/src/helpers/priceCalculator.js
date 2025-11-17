
  export const calculateDiscountedPrice = (originalPrice, discounts) => {
    const discountedPrice = originalPrice - (originalPrice * discounts) / 100;
    return {
   
      originalPrice: originalPrice,
      discountedPrice: discountedPrice,
      discounts: discounts
      
    };
    
  };