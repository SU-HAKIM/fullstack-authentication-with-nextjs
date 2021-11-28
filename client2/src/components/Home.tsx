import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const rt = Cookies.get("rt");
  if (!rt) {
    history.push("/login");
  }
  React.useEffect(() => {
    let generate = async function () {
      let response = await axios.post(
        "http://localhost:5000/auth/refresh-token",
        {
          refreshToken: rt,
        }
      );
      console.log(response);
      if (!response.data.accessToken || response.data.error) {
        history.push("/login");
      } else {
        Cookies.set("rt", response.data.refreshToken);
        let newResponse = await axios.get("http://localhost:5000", {
          headers: {
            Authorization: "Bearer " + response.data.accessToken,
          },
        });
        console.log(newResponse);
        if (!newResponse.data.access) {
          history.push("/login");
        }
      }
    };
    generate();
  }, [rt, history]);
  return <div>I am home page</div>;
};

export default Home;
