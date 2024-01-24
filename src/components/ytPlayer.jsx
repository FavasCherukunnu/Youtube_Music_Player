// src/components/YoutubeAudio.js
import React, { useEffect } from 'react';

export function YoutubeAudio({ videoId }) {

  var player;

  function stopVideo() {
    console.log(player)
    player.target.pauseVideo();
  }

  function playVideo(){
    player.target.playVideo()
  }

  useEffect(
    () => {
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
          height: '390',
          width: '640',
          videoId: videoId,
          playerVars: {
            'playsinline': 1,
            // 'enablejsapi':1,
            'autoplay':1,
            'loop':1
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
        player = event
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
    }, []
  )

  return (
    <div>
      <div id="YTplayer"></div>
      <button className='bg-black rounded-sm text-white p-1 px-3' onClick={stopVideo}>Pause</button>
      <button className='bg-black rounded-sm text-white p-1 px-3' onClick={playVideo}>Play</button>
    </div>
  );
}
