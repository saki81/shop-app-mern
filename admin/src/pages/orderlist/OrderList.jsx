import "./orderlist.css";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/apiCalls"


const OrderList = () => {
  
   const dispatch = useDispatch()
   const orders = useSelector((state) => state.order.orders);
   
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(9);

   useEffect(() => {
     getOrders(dispatch);
     console.log(orders)
   },[dispatch]);

   

const columns = [
  {field: "orderId", headerName: 'Id',width: 200},
  {field: "username", headerName: 'User',width: 150},
  {field: "email", headerName: 'Email',width: 150},
  {field: "total", headerName: 'Total', width: 100},
  {field: "status",
  headerName: 'Status', 
  width: 100,
  renderCell:(params)=> {

    return (
       <span className={params.value === "Processing" ? "status-processing" : "status-delivered"}>
          {params.value}
       </span>
    )
  }
 },

  {field: "action",
   headerName: "Action",
   width: 150,
   renderCell: (params) => {
  
     return (
      <>
        <Link to={`/order/${params.row._id}`}>
          <button className="order-list-view">
             View Details
          </button>
        </Link>
      </>
     )
    }
  
  }

];
const uniqueOrders = Array.from(new Map(orders.map(order => [order._id, order])).values());
 return (
    <div className="order-list">
      <div className="order-list-table">
      <DataGrid
        rows={uniqueOrders}
        columns={columns}
       
        rowsPerPageOptions={[9]}
        getRowId={(row) =>  row._id}
        pageSize={pageSize}
        page={page - 1}
        onPaginationModelChange={({ page: newPage, pageSize: newPageSize}) => {
          setPage(newPage + 1);
          setPageSize(newPageSize);
        }}
        
        checkboxSelection
        disableSelectionOnClick
        paginationModel={{pageSize, page: page -1}}/>
      </div>
    </div>
 );
};
export default OrderList;