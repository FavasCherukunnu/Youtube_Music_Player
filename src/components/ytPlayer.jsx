// src/components/YoutubeAudio.js
import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';

export function YoutubeAudio({ videoId }) {


  const [value, setValue] = useState(50);
  const [sliderSetup,setSliderSetup] = useState({
    max:0,
    min:0,
    currentValue:0
  })
  const [player,setPlayer] = useState()


  const handleSlideChange = (newValue) => {
    setSliderSetup({
      ...sliderSetup,
      currentValue:newValue
    })
  };




  function stopVideo() {
    console.log(player)
    player.target.pauseVideo();
  }

  function playVideo() {
    player.target.playVideo()
  }

  useEffect(
    () => {
      let timerId,playerinner,count=0;
      function startCheckDuration(){
        // timerId = setInterval(
        //   ()=>{
        //     const currtime = playerinner.target.getCurrentTime()
        //     console.log(currtime)
        //     count++
        //     setSliderSetup({ 
        //       ...sliderSetup,
        //       currentValue:currtime
        //     })
        //   },1000
        // )
      }
      // 2. This code loads the IFrame Player API code asynchronously.
      // var tag = document.createElement('script');

      // tag.src = "https://www.youtube.com/iframe_api";
      // var firstScriptTag = document.getElementsByTagName('script')[0];
      // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      // window.onYouTubeIframeAPIReady = initializePlayer;

      // 3. Initialize the YouTube player inside the callback function.
      function onYouTubeIframeAPIReady() {
        new window.YT.Player('YTplayer', {
          // height: '390',
          width: '100%',
          videoId: videoId,
          playerVars: {
            'playsinline': 1,
            'enablejsapi': 1,
            // 'autoplay':1,
            // 'loop':1
            // 'controls':0
          },
          events: {
            'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        playerinner = event
        setPlayer(event)
        // console.log(event.target.getAvailableQualityLevels())
        // event.target.seekTo(20);
        setSliderSetup({
          ...sliderSetup,
          max:event.target.getDuration(),
          currentValue:event.target.getCurrentTime()
        })
        startCheckDuration()
        event.target.playVideo();
      }
      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.

      var done = false;

      // function onPlayerStateChange(event) {
      //   if (event.data == window.YT.PlayerState.PLAYING && !done) {
      //     setTimeout(stopVideo, 6000);
      //     done = true;
      //   }
      // }




      onYouTubeIframeAPIReady()
      return ()=>{
        clearInterval(timerId)
      }
    }, []
  )

  return (
    <div>
      <div id="YTplayer"></div>
      <button className='bg-black rounded-sm text-white p-1 px-3' onClick={stopVideo}>Pause</button>
      <button className='bg-black rounded-sm text-white p-1 px-3' onClick={playVideo}>Play</button>
      <button className='bg-black rounded-sm text-white p-1 px-3' onClick={()=>{
        console.log(player.target.getCurrentTime())
      }}>currentTime</button>
      <div className="w-full mt-3">
        <ReactSlider
          value={sliderSetup.currentValue}
          min={0}
          max={sliderSetup.max}
          step={1}
          onChange={handleSlideChange}
          className="w-full appearance-none cursor-pointer bg-gray-200 rounded-full h-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          trackClassName="bg-blue-500 rounded-full h-3"
          thumbClassName="bg-white border border-gray-300 rounded-full h-5 w-5 focus:ring-2 focus:ring-white focus:ring-opacity-75"
        />
      </div>
    </div>
  );
}
