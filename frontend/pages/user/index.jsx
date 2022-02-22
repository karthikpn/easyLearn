import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../context";

const UserIndex = () => {
  const [hidden, setHidden] = useState(true);
  const router = useRouter();
  const {
    state: { user },
  } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/current-user");
        setHidden(false);
      } catch (error) {
        setHidden(false);
      }
    };
    fetchUser();
  }, []);
  return <div>{!hidden && user.name}</div>;
};

export default UserIndex;
