

import { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../Components/Context/Context';
const {adminDeleteUser} = useContext(ProductContext)

 const UsersList = ({ users,setUser }) => {
  // Initialize state from localStorage or default to an empty array
  const [blockedUsers, setBlockedUsers] = useState(() => {
    const storedBlockedUsers = localStorage.getItem('blockedUsers');
    return storedBlockedUsers ? JSON.parse(storedBlockedUsers) : [];
  });

  const handleBlockToggle = (userId) => {
    let updatedBlockedUsers;

    if (blockedUsers.includes(userId)) {
      // Unblock the user
      updatedBlockedUsers = blockedUsers.filter(id => id !== userId);
    } else {
      // Block the user
      updatedBlockedUsers = [...blockedUsers, userId];
    }

    // Update state
    setBlockedUsers(updatedBlockedUsers);
    
    // Save the updated blockedUsers list to localStorage
    localStorage.setItem('blockedUsers', JSON.stringify(updatedBlockedUsers));
  };
  

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="border p-4 mb-4">
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>

          {/* Block/Unblock Button */}
          <button 
            onClick={() => handleBlockToggle(user.id)} 
            className={`px-2 py-1 ${blockedUsers.includes(user.id) ? 'bg-red-500' : 'bg-green-500'} text-white`}
          >
            {blockedUsers.includes(user.id) ? 'Unblock' : 'Block'}
          </button>

          {/* Delete Button */}
          <button 
          onClick={() => adminDeleteUser(user.id)}
          className="bg-gray-500 text-white px-2 py-1 ml-4">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
;
}
