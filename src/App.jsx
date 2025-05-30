import React, { useState, useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import img from '../public/images/pngaaa.com-5008356.png'
import { CiLinkedin } from "react-icons/ci";
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {

  useEffect(() => {
    AOS.init({ duration: 1200 });
    AOS.refresh();
  }, []);

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
    <div className="flex justify-center item-center py-[50px] md:px-[40] h-[] bg-[#070942] ">
      <div className="App container   items-center flex flex-col gap-5">

      <h1 className=' text-2xl md:text-6xl font-bold py-2 md:py-4 text-white'>GitHub Candidate Search</h1>
      <div className='bg-white flex justify-end items-center w-[90%] md:w-[28%] rounded-2xl'>
      <input
        className='  mx-[30px] md:p-4 rounded-2xl focus:outline-none focus:border-none'
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
        <div className="profile mt-[40px] bg-white shadow-lg p-6 bg-gradient-to-b from-[#bebad4] to-[#41358aec] md:w-[60%] w-[90%]" data-aos="zoom-in">
          <img src={userData.avatar_url} alt="Avatar" width="100" className='rounded-full my-2' />
          <h2 className='text-2xl font-bold'>{userData.name || 'No Name Provided'}</h2>
          <p className='text-lg  font-semibold italic'>{userData.bio || 'No bio'}</p>
          <div className="border-t border-gray-300 my-4"></div>

          <p className='text-lg font-semibold'>Public Repos: {userData.public_repos}</p>
          <p className='text-lg font-semibold'>Followers: {userData.followers}</p>
          <a href={userData.html_url} target="_blank" rel="noreferrer" className='text-lg text-amber-200 flex  flex-row items-center italic gap-2'>View GitHub Profile <FaExternalLinkAlt /></a>
          
        </div>
      )}
      <div className='md:h-[530px] flex flex-row items-center px-[20px] md:px-[1px]'>
        <img src={img} alt="" data-aos="zoom-in" />
  
      </div>
      <div className="border-t border-gray-300 mt-4 w-[100%] py-5 flex
       flex-row justify-between px-5 text-amber-200 italic font-light"> 
       <div>
        {/* social medias */}
        <div className='flex flex-row items-center gap-1'><MdOutlineEmail />:<p>fabrice1niyo@gmail.com</p></div>
        <div className='flex flex-row items-center gap-1'><CiLinkedin />:<a href='https://www.linkedin.com/in/fabrice-niyomufasha-6aa8a4234' target='_blank'
        
        >Linkedin</a></div>
        <div className='flex flex-row items-center gap-1'><FaGithub />:<a href='https://github.com/niyomufashafabrice' target='_blank'>Github</a></div>
       </div>
       <div>
       &copy; NFabrice- 2025
       </div>
       </div>
    </div>
    </div>
  )
}

export default App