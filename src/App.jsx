import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Link, Route, Routes } from 'react-router-dom';
import PlayerPage from './playerPage';

function App() {

  const [searchString, setSearchString] = useState('');
  const [videos, setVideos] = useState([])

  function convertDurationToHMS(isoDuration) {
    // Parse the ISO 8601 duration using a regular expression
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    // console.log(isoDuration)
    // console.log(match)
    // Extract hours, minutes, and seconds from the matched groups
    if (match===null ||match.length <= 2) {
      return 'nill'
    }
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const seconds = match[3] ? parseInt(match[3], 10) : 0;

    // Format the result as "hh:mm:ss"
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formattedTime;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log()

    try {
      const res = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            part: 'snippet',
            key: process.env.REACT_APP_API_KEY,
            maxResults: 150,
            q: searchString,
            type: 'video'
          }
        }
      )
      const videoIds = res.data.items.map(
        item => item.id.videoId
      )
      // console.log(videoIds)
      const videoDetailsRes = await axios.get(
        'https://www.googleapis.com/youtube/v3/videos',
        {
          params: {
            part: 'snippet,contentDetails',
            key: process.env.REACT_APP_API_KEY,
            id: videoIds.join(',')
          }
        }
      );
      console.log(videoDetailsRes.data.items)
      setVideos(videoDetailsRes.data.items)
    } catch (e) {
      console.log(e.response?.data)
    }

  }



  return (
    <div className=' fixed inset-0 bg-slate-500 overflow-auto'>

      <Routes>
        <Route path='/player/:id' element={<PlayerPage />} />
      </Routes>

      <div className=' topnav w-full h-14 bg-gray-800 flex items-center justify-center sticky top-0'>
        <form onSubmit={onSubmit} className=' flex gap-2'>
          <input value={searchString} className=' border rounded-md text-white bg-transparent p-1 ' placeholder='Search' onChange={(e) => setSearchString(e.target.value)} />
          <button className=' border bg-white hover:bg-gray-200 p-1 rounded-md shadow-sm ' type='submit'>Search</button>
        </form>
      </div>

      {/* Videos listes here */}

      <div className=' videoList w-full p-3 flex flex-col gap-3'>
        {
          videos.map(
            (videos, index) => {

              const { snippet, contentDetails } = videos

              return (
                <div key={index} className=' videoItem border-white border rounded-md p-2'>
                  <Link to={`player/${videos.id}`}>
                    <div className='title font-bold text-white'>{snippet.title}</div>
                    <img src={snippet.thumbnails.default.url} alt="" />
                  </Link>
                  <div className='duration bg-black rounded-md text-white p-1 px-2 w-min'>{convertDurationToHMS(contentDetails.duration)}</div>
                </div>

              )
            }
          )
        }
      </div>

    </div>
  );
}

export default App;
