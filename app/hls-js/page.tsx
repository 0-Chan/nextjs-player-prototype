"use client";

import Hls from "hls.js";
import { useEffect, useRef } from "react";

const videoSource = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

export default function HlsJsExample() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({
        debug: true,
      });
      hls.loadSource(videoSource);
      hls.attachMedia(videoRef.current!);
    }
  }, []);

  return (
    <video
      src="https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd"
      ref={videoRef}
      controls
      autoPlay
    />
  );
}
