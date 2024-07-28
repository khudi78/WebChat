import React from 'react';
import '../index.css'
const BackgroundVideo = () => {
  return (
    <div className="relative overflow-hidden h-screen">
      <video className="background-video" autoPlay loop muted>
        <source src={`http://localhost:3000/dist/drone.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
