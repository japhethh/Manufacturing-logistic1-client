import React, { useEffect, useRef } from "react";

const MusicClick = () => {
  const audioRef = useRef(null);

  // Fetch music from Cloudinary and set it as the audio source
  const fetchMusic = () => {
    const cloudinaryUrl =
      "https://res.cloudinary.com/dn3rs8crz/video/upload/v1727798980/ElevenLabs_2023-08-22T11_42_35.000Z_Callum_kkpgib.mp3"; // Replace with your Cloudinary URL
    if (audioRef.current) {
      audioRef.current.src = cloudinaryUrl;
    }
  };

  // Play the audio
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  // Pause the audio
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Stop the audio (pause and reset to the start)
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to the beginning
    }
  };

  // Fetch the music once when the component is mounted
  useEffect(() => {
    fetchMusic();
  }, []);

  return (
    <div>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
      <audio ref={audioRef} />
    </div>
  );
};

export default MusicClick;
