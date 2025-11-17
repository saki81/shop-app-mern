import { useSelector } from "react-redux";
import loader from "../image/loader.gif";


const Loading = () => {
  const showLoader = useSelector(state => state.loader.loader)

  return ( 
      showLoader &&
      <div className="loading">
          <img src={loader} alt="loader"/>
      </div> 
   );
}
 
export default Loading;