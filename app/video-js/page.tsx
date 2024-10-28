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
    width: 1280,
    sources: [
      {
        src: "https://ik.imagekit.io/ikmedia/sample-video.mp4/ik-master.m3u8?tr=sr-240_360_480_720",
        type: "application/x-mpegURL",
      },
    ],
  };
  const videoJsOptionsMpd = {
    controls: true,
    autoplay: false,
    width: 1280,
    sources: [
      {
        src: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
        type: "application/dash+xml",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    console.log(player.qualityLevels());

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  return (
    <main>
      <div>
        <VideoJS options={videoJsOptionsMpd} onReady={handlePlayerReady} />
      </div>
    </main>
  );
}
