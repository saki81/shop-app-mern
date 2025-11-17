import styled from "styled-components";
import { publicRequest,userRequest } from "../../axiosMethod";
import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import  { formatedDate, formatTimeAgo} from "../../helpers/formatDate"

const UserOrders = () => {

  const currentUser = useSelector((state) => state.auth.currentUser)
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)

 

  useEffect(() => {
    if(currentUser?._id) {
      fetchOrders(currentUser._id)
    }
   console.log("Current user:", currentUser);

  }, [currentUser]);

   console.log("Fetching orders for userId:", currentUser._id);

  const fetchOrders = async (userId) => {
    try {
       const res = await userRequest.get(`orders/user/${userId}`);
       
      setOrders(res.data)
      console.log("Orders data:", res.data)
    
    } catch (err) {
      console.error("Error fetching orders:", err.response?.data || err.message);
    } finally {
      setLoading(false)
    }
 };
  


 const columns = [
  { field: "_id", headerName: "User ID", width: 250 },
  { 
    field: "createdAt",
    headerName: "Date", 
    width: 200,
   valueGetter: (params) => formatedDate(params.row.createdAt)
  },
  { field: "status", 
    headerName: "Status", 
    width: 150,
    renderCell: (params) => {
      return (
        <span className={ params.value === 'Processing' ? 'status-processing' : 'status-delivered'}>
             {params.value}
        </span>
      )
    } 
  },
  {
    field: "total",
    headerName: "Total",
    width: 150,
    valueGetter: (params) => `$${params.row.total.toFixed(2)}`,
  },
  {
    field: "details",
    headerName: "Details",
    width: 170,
    renderCell: (params) => {
      return (
       <>
        <Link
         to={`/user/order/${params.row.orderId}`}>
         <button
           className="order-btn">
           View Details
         </button>
        </Link>
      </>
      )
    }
  },
];

  return ( 
    <Container>
       <OrderTitle>My Order</OrderTitle>
       <Wrapper>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserTable>
        <DataGrid 
          rows={orders} 
          columns={columns} 
          pageSize={9} 
          getRowId={(row) => row._id} />
        </UserTable>
      )}
    </Wrapper>
    </Container> 
  );
}
 
export default UserOrders;

const Container = styled.div`
  padding: 60px 0;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1280px;
  flex-wrap: wrap;
  margin: 0 auto;
`;
const UserTable = styled.div`
  width: 85%;
  height: 700px;
`;
const OrderTitle = styled.h2`
  padding: 70px;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin: auto;
  color: #525454;
  letter-spacing: 1px;
`;