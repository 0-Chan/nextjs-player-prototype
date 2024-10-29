"use client";

import ShakaPlayer from "@/components/players/shakaPlayer";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

import videojs from "video.js";
import VideoJS from "../../components/players/videoJs";


const videoSource = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

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

export default function AllExample() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({
        debug: true,
      });
      hls.loadSource(videoSource);
      hls.attachMedia(videoRef.current!);
    }
  }, []);


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
    <div className="space-y-4">
      <div>
        <h1>- hls.js</h1>
        <video
          src="https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd"
          ref={videoRef}
          controls
          autoPlay
        />
      </div>
      <div>  
        <h1>- video.js</h1>
        <VideoJS options={videoJsOptionsMpd} onReady={handlePlayerReady} />
      </div>
      <div>  
        <h1>- shaka player</h1>
        <ShakaPlayer />
      </div>
    </div>
  );
}
