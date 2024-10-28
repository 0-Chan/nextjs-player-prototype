"use strict";
"use client"; // to ensure client side execution as we are using client-side hooks like useRef

import { useRef } from "react";
import videojs from "video.js";
import VideoJS from "../../components/players/videoJs";


export default function Home() {
  const playerRef = useRef(null);

  const videoJsOptionsM3u8 = {
    controls: true,
    autoplay: false,
    width: 400,
    sources: [
      {
        src: 'https://ik.imagekit.io/ikmedia/sample-video.mp4/ik-master.m3u8?tr=sr-240_360_480_720',
        type: 'application/x-mpegURL'
      },
    ],
  };
  const videoJsOptionsMpd = {
    controls: true,
    autoplay: false,
    width: 400,
    sources: [
      {
        src: 'https://ik.imagekit.io/demo/sample-video.mp4/ik-master.mpd?tr=sr-240_360_480_720_1080',
        type: 'application/dash+xml'
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    console.log(player.qualityLevels())

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };
  return (

    <main >
      <div>
        <VideoJS options={videoJsOptionsM3u8} onReady={handlePlayerReady} />
      </div>
    </main>
  );
}