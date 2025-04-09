import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaExternalLinkAlt } from "react-icons/fa";

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
    <div className="flex justify-center item-center py-[50px] px-[40] h-[100vh] bg-[#070942]">
      <div className="App container   items-center flex flex-col gap-5">
      <h1 className=' text-6xl font-bold py-4 text-white'>GitHub Candidate Search</h1>
      <div className='bg-white flex justify-end items-center w-[28%] rounded-2xl'>
      <input
        className='  mx-[30px] p-4 rounded-2xl focus:outline-none focus:border-none'
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSearch}
       className='border border-amber-200 px-[30px] py-[12px] rounded-2xl hover:scale-[1.1] hover:bg-amber-200 hover:text-black cursor-pointer'>Search</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userData && (
        <div className="profile mt-[40px] bg-white shadow-lg p-6 bg-gradient-to-b from-[#bebad4] to-[#41358aec] w-[60%]">
          <img src={userData.avatar_url} alt="Avatar" width="100" className='rounded-full my-2' />
          <h2 className='text-2xl font-bold'>{userData.name || 'No Name Provided'}</h2>
          <p className='text-lg  font-semibold italic'>{userData.bio || 'No bio'}</p>
          <div className="border-t border-gray-300 my-4"></div>

          <p className='text-lg font-semibold'>Public Repos: {userData.public_repos}</p>
          <p className='text-lg font-semibold'>Followers: {userData.followers}</p>
          <a href={userData.html_url} target="_blank" rel="noreferrer" className='text-lg text-amber-200 flex  flex-row items-center italic gap-2'>View GitHub Profile <FaExternalLinkAlt /></a>
        </div>
      )}
    </div>
    </div>
  )
}

export default App