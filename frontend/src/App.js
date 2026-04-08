import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State variables (memory for our component)
  const [backendStatus, setBackendStatus] = useState('Checking backend...');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // This runs automatically when the page loads
  useEffect(() => {
    checkBackendHealth();
    loadUsers();
  }, []);

  // Function to check if backend is alive
  async function checkBackendHealth() {
    try {
      const response = await fetch('http://localhost:5000/health');
      const data = await response.json();
      setBackendStatus(`✅ Backend is healthy! Service: ${data.service}`);
    } catch (error) {
      setBackendStatus('❌ Cannot reach backend. Make sure it\'s running on port 5000');
    }
  }

  // Function to load users from backend
  async function loadUsers() {
    setLoading(true);
    setUsers([]); // Clear previous users
    setBackendStatus('🔄 Loading users...');
    
    try {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      setUsers(data);
      setBackendStatus(`✅ Loaded ${data.length} users successfully!`);
    } catch (error) {
      setBackendStatus('❌ Failed to load users. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <h1>🚀 Microservices Platform</h1>
      
      <div className="status-card">
        <h2>Backend Status</h2>
        <p>{backendStatus}</p>
      </div>

      <div className="status-card">
        <h2>📋 Users List</h2>
        <button onClick={loadUsers} disabled={loading}>
          {loading ? 'Loading...' : 'Load Users'}
        </button>
        
        <div className="users-list">
          {users.map(user => (
            <div key={user.id} className="user-item">
              <strong>{user.name}</strong>
              <br />
              📧 {user.email}
              <br />
              🆔 ID: {user.id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;