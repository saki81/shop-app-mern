import { useState, useMemo, useEffect } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredinfo/FeturedInfo";
import WidgetLeft from "../../components/widgetleft/WidgetLeft";
import WidgetRight from "../../components/widgetright/WidgetRight";
import "./home.css";
import { userRequest } from "../../axiosMethod";


const Home = () => {

   const  [ userStats, setUserStats ] = useState([]);

   const MONTHS = useMemo(() => 
       [
         "Jan",
         "Feb",
         "Mar",
         "Apr",
         "Maj",
         "Jun",
         "Jul",
         "Avg",
         "Sep",
         "Okt",
         "Nov",
         "Dec",
       ],[]);

       useEffect(() => {

          const getStats = async () => {

            try {
                const res = await userRequest.get("users/stats");
                console.log("Response data:", res.data);
           
                res.data.map((item) => setUserStats((prev) => [
                ...prev,
                { name: MONTHS[item._id - 1], "Active User": item.total },
              ])
            );
           } catch (err) {
          console.error("Error fetching user stats:", err);
          }
      };
      getStats();
    }, [MONTHS]);
      
   return ( 
     <div className="home">
         <FeaturedInfo />
         <Chart data={userStats} title="User Analitics" grid dataKey="Active User"/>
         <div className="home-widget">
            <WidgetLeft />
            <WidgetRight />
         </div>
     </div>  
   );
}
 
export default Home;