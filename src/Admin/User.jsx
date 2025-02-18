
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { ProductContext } from '../Components/Context/Context';

export default function User() {
  const { users, setUsers, } = useContext(ProductContext);

  // Fetch users function
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/users/getUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data); // Update users state
      console.log('Fetched users:', response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  // Toggle block status
  // const handleBlockToggle = async (userId, isBlocked) => {
  //   try {
  //     const url = `http://localhost:4001/api/users/block/${userId}`;
  //     const response = await axios.put(
  //       url,
  //       { blocked: !isBlocked },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       alert(response.data.message); // Show success message

  //       // Update the users state locally to reflect the change
  //       const updatedUsers = users.data.map((user) =>
  //         user._id === userId ? { ...user, blocked: !isBlocked } : user
  //       );
  //       setUsers({ data: updatedUsers }); // Update state with modified user list
  //     }
  //   } catch (error) {
  //     console.error('Error updating block status:', error);
  //     alert('Failed to update block status.');
  //   }
  // };

  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      const url = `http://localhost:4001/api/users/block/${userId}`;
      const response = await axios.put(
        url,
        { blocked: !isBlocked },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.status === 200) {
        const action = isBlocked ? "Unblocked" : "Blocked"; // Determine action dynamically
        alert(`User ${action} successfully`); // Display appropriate message
  
        // Update the users state locally to reflect the change
        const updatedUsers = users.data.map((user) =>
          user._id === userId ? { ...user, blocked: !isBlocked } : user
        );
        setUsers({ data: updatedUsers }); // Update state with modified user list
      }
    } catch (error) {
      console.error('Error updating block status:', error);
      alert('Failed to update block status.');
    }
  };

  // const adminDeleteUser = async (userId)=>{
  //   try
  //  { 
  //   const response = await axios.delete(`http://localhost:4001/api/users/delete/${userId}`,{},
  //     {
  //       headers:{
  //         Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     }

  //   )
  //   if(response.status === 200)
  //     setUsers(users.data.filter(user => user._id !== userId));

  //   alert(`product deleted successfully`);
  // }catch(error){
  //     console.error("error occured",error)

  //   }
    
  // }



  const adminDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4001/api/users/delete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      if (response.status === 200) {
        alert('User deleted successfully');
        
        // Update the users state
        const updatedUsers = users.data.filter(user => user._id !== userId);
        setUsers({ data: updatedUsers });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };
  
  

  // Safeguard user data
  const userData = users?.data || [];

  return (
    <div>
      {userData.map((user) => (
        <div key={user._id} className="border p-4 mb-4">
          <h2>Name: {user.name}</h2>
          <p>Email: {user.email}</p>

          <button
            onClick={() => handleBlockToggle(user._id, user.blocked)}
            className={`px-4 py-2 rounded text-white ${
              user.blocked
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {user.blocked ? 'Unblock' : 'Block'}
          </button>

          <button
            className="bg-gray-500 text-white px-2 py-1 ml-4"
            onClick={() => adminDeleteUser(user._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
