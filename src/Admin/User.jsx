// import React, { useContext, useEffect, useState } from 'react'
// import axios from 'axios';
// import { CgPathCrop } from 'react-icons/cg';
// import { object } from 'yup';
// import { ProductContext } from '../Components/Context/Context';



// export default function User() {
//   const { users ,setUsers,adminDeleteUser } = useContext(ProductContext);
//   // const [blockedUsers, setBlockedUsers] = useState([]);

  
//   const handleBlockToggle = (userId, currentBlockStatus) => {
//     axios.patch(`http://localhost:3000/users/${userId}`, { isBlock: !currentBlockStatus })
//       .then(response => {
//         console.log("User block status updated:", response.data);
//         // Update the UI or state here if needed
//       })
//       .catch(error => {
//         console.error("There was an error updating the block status:", error);
//       });
//   };

//   return (


//     <div>
//       {users.map((user) => (
//         <div key={user.id} className="border p-4 mb-4">
//           <h2>Name:{user.fname}</h2>
//           <p>Email: {user.email}</p>

//           {/* Block/Unblock Button */}
//           {/* <button
//             onClick={() => handleBlockToggle(user.id, user.isBlock)}
//             className={`px-2 py-1 ${blockedUsers.includes(user.id) ? 'bg-red-500' : 'bg-green-500'} text-white`}
//           >
//             {blockedUsers.includes(user.id) ? 'Unblock' : 'Block'}
//           </button> */}
//           <button 
//       onClick={() => handleBlockToggle(user.id, user.isBlock)} 
//       className={`px-2 py-1 ${user.isBlock ? 'bg-red-500' : 'bg-green-500'} text-white`}
//     >
//       {user.isBlock ? 'Unblock' : 'Block'}
//     </button>
          

//           {/* Delete Button */}
//           <button className="bg-gray-500 text-white px-2 py-1 ml-4"
//           onClick={()=>adminDeleteUser(user.id)}>
//             Delete

//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }




import React, { useContext } from 'react';
import axios from 'axios';
import { ProductContext } from '../Components/Context/Context';

export default function User() {
  const { users, setUsers, adminDeleteUser } = useContext(ProductContext);

  const handleBlockToggle = (userId, currentBlockStatus) => {
    axios.patch(`http://localhost:3000/users/${userId}`, { isBlock: !currentBlockStatus })
      .then(response => {
        console.log("User block status updated:", response.data);

        // Update the local users state
        const updatedUsers = users.map(user => 
          user.id === userId ? { ...user, isBlock: !currentBlockStatus } : user
        );
        setUsers(updatedUsers);  // Update the state to reflect changes
      })
      .catch(error => {
        console.error("There was an error updating the block status:", error);
      });
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="border p-4 mb-4">
          <h2>Name: {user.fname}</h2>
          <p>Email: {user.email}</p>

          {/* Block/Unblock Button */}
          <button 
            onClick={() => handleBlockToggle(user.id, user.isBlock)} 
            className={`px-2 py-1 ${user.isBlock ? 'bg-red-500' : 'bg-green-500'} text-white`}
          >
            {user.isBlock ? 'Unblock' : 'Block'}
          </button>

          {/* Delete Button */}
          <button className="bg-gray-500 text-white px-2 py-1 ml-4"
            onClick={() => adminDeleteUser(user.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
