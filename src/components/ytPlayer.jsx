// src/components/YoutubeAudio.js
import React from 'react';

export function YoutubeAudio({ videoId }) {
  const audioUrl = `https://www.youtube.com/watch?v=${videoId}`;
  // const audioStream = ytdl(audioUrl);

  return (
    <audio controls>
      <source src={audioUrl} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
