import React, { useState } from 'react'
import './App.css'
import ItemList from './components/Items'
import Auth from './components/Auth'
const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <div className='App'>
      <header className="App-header">
        <h1>Item Management App</h1>
      </header>
      <main>
        {user ? (
          <ItemList />
        ) : (
          <Auth onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
};

export default App;