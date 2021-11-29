import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  React.useEffect(() => {
    let generate = async function () {
      const rt = Cookies.get("rt");
      console.log(rt, "home");
      if (!rt) {
        history.push("/login");
        return;
      }
      let response = await axios.post(
        "http://localhost:5000/auth/refresh-token",
        {
          refreshToken: rt,
        }
      );
      if (response.data.error) {
        console.log(response, "home");
        history.push("/login");
      } else {
        Cookies.set("rt", response.data.tokens.refreshToken);
        let newResponse = await axios.get("http://localhost:5000", {
          headers: {
            Authorization: "Bearer " + response.data.tokens.accessToken,
          },
        });
        console.log(newResponse, "new home");
        if (!newResponse.data.access) {
          history.push("/login");
        }
      }
    };
    generate();
  }, [history]);
  return <div>I am home page</div>;
};

export default Home;
