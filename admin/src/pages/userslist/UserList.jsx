import "./userlist.css";
import { useEffect,useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../redux/apiCalls";


const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(9)

  useEffect(() => {
    console.log("Users", users)
    getUsers(dispatch, page, pageSize);
  }, [page, pageSize,dispatch]);


  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  const columns = [
    { field: "username", headerName: "User", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "password", headerName: "Password", width: 350 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        if (params.row._id === undefined || params.row._id === null) {
          return null; 
        }
        return (
          <>
            <Link to={`/user/${params.row._id}`}>
              <button className="user-list-edit">Edit</button>
            </Link>
            <DeleteOutline
              className="user-list-delete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="user-list">
      <div className="user-list-table">
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={pageSize}
          page={page - 1}
          rowsPerPageOptions={[9]}
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

export default UserList;
