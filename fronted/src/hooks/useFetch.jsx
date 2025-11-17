import { useState, useEffect } from "react";
import { publicRequest } from "../axiosMethod";

const useFetch = ({ cat, topSelling, discounted,newProd,recommended,userIdRecoman, searchTerm, single, similar }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null)
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false); 
  const [totalProducts, setTotalProducts] = useState(0);

  const limit = 9;

  const fetchProducts = async (reset = false) => {
     setLoading(true);
    try {
      let res;
      let newProducts = [];
      let singleProduct = null;
      let currentPage = 1;
      let totalPage = 1;
      
      if (similar) {
        res =  await publicRequest.get(`products/similar/${similar}`);
        newProducts = res.data || [];
        setProducts(newProducts);
        return;
       };
      if(searchTerm && searchTerm.trim().length >= 2 ) {
        
        res = await publicRequest.get(`products/search-all?query=${searchTerm}&page=${reset ? 1 : page}&limit${limit}`);
        newProducts = res.data.products || [];
        currentPage = res.data.currentPage || 1;
        totalPage = res.data.totalPage || 1;

        setLoadMore(currentPage < totalPage);
        setTotalProducts(res.data.totalProducts || 0);

      setProducts(reset
        ? newProducts
        : (prev) => [...prev, ...newProducts.filter(p => !prev.some(x => x._id === p._id))]
      );
      return; 
       };
     if (single) {
        res = await publicRequest.get(`products/find/${single}`);
        singleProduct = res.data;
        setProduct(singleProduct);
        await publicRequest.put(`products/increase-views/${singleProduct._id}`);
       };  
     if (userIdRecoman && singleProduct) {
        await publicRequest.put(`users/add-viewed/${userIdRecoman}`, {
            productId: singleProduct._id    
          });
        return;
       };
     if (topSelling) {
        res = await publicRequest.get(`products/best-sellers`);
        newProducts = res.data || [];
        setProducts(newProducts);
        return; 
       };
     if (discounted) {
       res = await publicRequest.get("products/discounted?limit=4");
        newProducts = res.data || [];
        setProducts(newProducts);
        setLoadMore(false);
        return;
       };
     if (newProd) {
        res = await publicRequest.get("products/new-products");
        newProducts = res.data || [];
        setProducts(newProducts);
        setLoadMore(false);
        return;
       };
     if (recommended) {
        const url = userIdRecoman
        ? `products/recommended?limit=4?userId=${userIdRecoman}`
        : `products/recommended?limit=4`;

        res = await publicRequest.get(url);
        newProducts = res.data || [];
        setProducts(newProducts);
        setLoadMore(false);
        return;
      };

        const url = cat
          ? `/products?category=${cat}&page=${reset ? 1 : page}&limit=${limit}`
          : `/products?page=${reset ? 1 : page}&limit=${limit}`

        res = await publicRequest.get(url);
     
        singleProduct = res.data.product; 
        newProducts = res.data.products || [];
        currentPage = res.data.currentPage || 1;
        totalPage = res.data.totalPage || 1;
        
        setTotalProducts(res.data.totalProducts || res.data.newProducts || [] )
        setLoadMore( currentPage < totalPage );

        setProducts(reset
        ? newProducts
        : (prev) => [...prev, ...newProducts.filter(p => !prev.some(x => x._id === p._id))]
      );
    
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    
    } finally {
      setLoading(false);
    }
  };

  const resetPagination = () => {
    setProducts([]);
    fetchProducts(true); 
    setPage(1);
  };

  useEffect(() => {
    
    fetchProducts(true);
    
  }, [cat, topSelling, discounted, searchTerm, single,recommended]);
  
  useEffect(() => {
    
    if (page > 1 && !searchTerm) {
      fetchProducts();
     setLoading(true)
    }
  }, [page]);

    const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { products, product, loading, loadMore, handleLoadMore, resetPagination,totalProducts };
};

export default useFetch;

