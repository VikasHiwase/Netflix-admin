import { Visibility } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./widgetSm.css";

function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDUyMzAwMTA5OTRmZDEyZTMxMjQxYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0Nzc0OTgxNCwiZXhwIjoxNjQ4MTgxODE0fQ.LvDRTUht0mUdkhE2G7qUnC14-lUdLyey5KnxIMJG3QE",
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);

  // console.log(newUsers);

  return (
    <div className="widgetSm">
      <h3 className="widgetSmTitle">New Join Members</h3>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
          <li className="widgetSmListItem">
            <img
              src={
                user.profilePic ||
                "https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"
              }
              alt="person"
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">Software Engineer</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" /> Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WidgetSm;
