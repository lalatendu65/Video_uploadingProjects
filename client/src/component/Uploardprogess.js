import React from 'react'
import { useEffect, useState } from "react";

export default function Uploardprogess() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const socket = new WebSocket("ws://localhost:4000"); // Replace with your server URL

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setProgress(data.progress.toFixed(2));
      };

      return () => {
        // Clean up WebSocket connection if needed
      };
    }, []);
  return (
    <div>
        <h2>Upload Progress</h2>
      <progress max="100" value={progress}></progress>
      <p>{`${progress}%`}</p>
   
        

      
    </div>
  )
}
