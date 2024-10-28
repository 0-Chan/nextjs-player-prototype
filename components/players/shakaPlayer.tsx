import { useEffect, useRef } from "react";
const shaka = require('shaka-player/dist/shaka-player.ui.js');

const ShakaPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const player = new shaka.Player(video);
      player.load('https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd').catch((error: any) => {
        console.error('Error loading video:', error);
      });
  
      return () => {
        player.destroy();
      };
    }
  }, []);

  return (
    <video ref={videoRef} controls />
  )
}

export default ShakaPlayer;