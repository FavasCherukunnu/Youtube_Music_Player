import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [searchString,setSearchString] = useState('');

  const onSubmit = async(event)=>{
    event.preventDefault();
    // console.log()

    try{
      const res = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params:{
            'part':searchString,
            key:process.env.REACT_APP_API_KEY
          }
        }
        )
        console.log(res)
    }catch(e){
      console.log(e.response?.data)
    }

  }



  return (
    <div className=' fixed inset-0 bg-slate-500'>
      <div className=' topnav w-full h-14 bg-gray-800 flex items-center justify-center'>
        <form onSubmit={onSubmit} className=' flex gap-2'>
          <input value={searchString} className=' border rounded-md text-white bg-transparent p-1 ' placeholder='Search' onChange={(e)=>setSearchString(e.target.value)} />
          <button className=' border bg-white hover:bg-gray-200 p-1 rounded-md shadow-sm ' type='submit'>Search</button>
        </form>
      </div>
    </div>
  );
}

export default App;
