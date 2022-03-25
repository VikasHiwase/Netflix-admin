import React from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import "./home.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDUyMzAwMTA5OTRmZDEyZTMxMjQxYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0Nzc0OTgxNCwiZXhwIjoxNjQ4MTgxODE0fQ.LvDRTUht0mUdkhE2G7qUnC14-lUdLyey5KnxIMJG3QE",
          },
        });
        const statsList = res.data.sort((a, b) => a._id - b._id);
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  // console.log(userStats);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart title="User Analytics" data={userStats} dataKey="New User" grid />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}

export default Home;
