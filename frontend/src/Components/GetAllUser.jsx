import React, { useEffect, useState } from "react";
import axios from "axios";

const GetAllUser = () => {
  const apiURL = "https://workoutproject-api.onrender.com/api/admin/getAllUser";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const response = await axios.get(apiURL);
      setUsers(response.data.data); // Assuming the response structure is { data: { data: [...] } }
      console.log(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.userName}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUser;
