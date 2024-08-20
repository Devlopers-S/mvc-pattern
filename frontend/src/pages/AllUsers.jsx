import React, { useState, useEffect } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/allUsers")
      .then((res) => res.json()) // Parse the JSON from the response
      .then((data) => {
        setUsers(data); // Set the users state with the parsed data
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {users.map((user) => (
        <div
          className="flex flex-col items-center justify-center"
          key={user._id}
        >
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
