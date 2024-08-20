import React, { useState, useEffect } from 'react'
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
   async function fetchUsers() {
    const response = await axios.get("http://localhost:4000/admin/allUsers");
    
    setUsers(response.data);
  }
  useEffect(() => {
    fetchUsers();
    });
    const handleDelete = async (email) => {
      await axios.delete("http://localhost:4000/admin/delete", { data: { email } });
      fetchUsers();
    };
  return (
    <div>
      <div className="max-w-2xl mt-4 mx-auto border-2 border-gray-300 rounded-md">
        <div className="flex justify-between w-full px-3 py-2">
          <p className="w-1/3">User</p>           
          <p className="w-1/3">Name</p>
          <p className="w-1/3">Email</p>
          <p className="w-1/3">Delete</p>
        </div>
        {users.map((user, index) => (
          <div
            className={`bg-gray-100 flex justify-between px-3  py-2 ${
              index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
            }`}
            key={user._id}
          >
            <div className="w-1/3 text-center">{index + 1}</div>
            <div className="w-1/3 text-center">{user.name}</div>
            <div className="w-1/3 text-center">{user.email}</div>
            <div className="w-1/3 text-center">
              <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => handleDelete(user.email)}>delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUsers