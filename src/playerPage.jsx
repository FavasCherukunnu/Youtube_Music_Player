import React from 'react'
import { useParams } from 'react-router-dom'
import { YoutubeAudio } from './components/ytPlayer';

export default function PlayerPage() {
    const {id} = useParams();
  return (
    <div className=' fixed inset-0 z-40 bg-white'>
        <YoutubeAudio videoId={id}/>
    </div>
  )
}
