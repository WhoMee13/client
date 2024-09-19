import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const approveUser = async (userId) => {
    try {
      await fetch(`/api/users/${userId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchUsers();  // Refresh user list after approval
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchUsers();  // Refresh user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <span>{user.name} - {user.status}</span>
            {user.status === 'pending' && (
              <button onClick={() => approveUser(user._id)}>Approve</button>
            )}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
