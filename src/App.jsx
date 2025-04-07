import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";

const App = () => {

  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setError('');
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('User not found');
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setUserData(null);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center item-center px=[40] h-[600px]">
      <div className="App container  justify-center">
      <h1 className=' tetx-4xl font-bold py-3'>GitHub Candidate Search</h1>
      <input
        className=' border border-amber-200 mx-[30px] p-4 rounded-2xl'
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSearch}
       className='border border-amber-200 px-[30px] py-[12px] rounded-2xl hover:scale-[1.1] hover:bg-amber-200 hover:text-black cursor-pointer'>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userData && (
        <div className="profile mt-[40px]">
          <img src={userData.avatar_url} alt="Avatar" width="100" className='rounded-full my-2' />
          <h2 className='text-xl '>{userData.name || 'No Name Provided'}</h2>
          <p>{userData.bio || 'No bio'}</p>
          <p>Public Repos: {userData.public_repos}</p>
          <p>Followers: {userData.followers}</p>
          <a href={userData.html_url} target="_blank" rel="noreferrer">View GitHub Profile</a>
        </div>
      )}
    </div>
    </div>
  )
}

export default App