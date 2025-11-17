import "./productlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, deleteProducts  } from "../../redux/apiCalls";
import { useDispatch , useSelector } from "react-redux" 
import { DeleteOutline } from "@material-ui/icons";

const ProductList = () => {

   const dispatch = useDispatch()
   const {products,currentPage,totalPage} = useSelector((state) => ({
      products: state.product.products.products || [],
      currentPage: state.product.currentPage,
      totalPage: state.product.totalPage
}));
   
   const [page, setPage] = useState(currentPage);
   const [pageSize, setPageSize] = useState(9);
  

   useEffect(() => {
      getProducts(dispatch,page, pageSize)
      console.log("Products",products);
   },[page, pageSize, dispatch]);
  
      const handleDelete = (id) => {
         deleteProducts(id,dispatch)
      }
 
    useEffect(() => {
      console.log("Products:", products);
      console.log("Total Pages:", totalPage);
    },[products, totalPage])
   

   const columns = [
      {field: "_id", headerName: 'Id', width: 300},
    
      {field: 'product', headerName: 'Product', width: 240, renderCell: (params) => {
          return (
            <>
             <div className="product-data">
               { params.row.discounts ? 
                      (<div className="discount">{`-${params.row.discounts}%`}</div>) : ("") }

               {!params.row.inStock && (<div className="stock">Out</div>) }
               {params.row.newProd && (<div className="new">New</div>)}
               <img className="img-avatar" src={params.row.img } alt="" /> 
               
               {params.row.title}
             </div>
            </>
          )
      }
   },
   
      { 
         field: 'price',
         headerName: 'Price',
         type: 'number',
         width: 200,
         valueGetter: (params) => params.row.discountedPrice || params.row.price 
       },
      {
         field: 'action',
         headerName: 'Action',
         width: 150,
         renderCell: (params) => {
            
            return (
              <>
               <Link to={`/product/${params.row._id}`}>
                 <button className="product-list-edit">
                   Edit
                 </button>
                </Link>
                <DeleteOutline 
                 className="product-list-delete"
                         onClick={()=>handleDelete(params.row._id)}/>
              </>
            )
         }
      }
   ];
   return ( 
      <div className="product-list">
         <div className="product-list-table">
         <DataGrid
          rows={products} 
          columns={columns}
          getRowId={(row) => row._id  }
          pagination
          paginationMode="server"
          rowCount={totalPage * pageSize} 
          page={page -1}
          pageSize={pageSize}
          onPaginationModelChange={({ page: newPage, pageSize: newPageSize }) => {
            setPage(newPage + 1); 
            setPageSize(newPageSize);
          }}
          rowsPerPageOptions={[9,25,50]} 
          checkboxSelection
          disableselectionOnClick
          paginationModel={{pageSize, page: page -1}}/>
        </div>
      </div>
    );
};
 
export default ProductList;