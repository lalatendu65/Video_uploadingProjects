import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Uploardprogess() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");

  useEffect(() => {

    const socket = new WebSocket("ws://localhost:4000"); // Replace with your server URL

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setProgress(data.progress.toFixed(2));
    };  
  }, []);
  const dowonLoadProgress = async () => {
        setLoading(true);
        const res = await axios.post("http://localhost:4000/start-download"); // Replace with your server URL
        if (res.status === 200) {
        setLoading(false);

        setMessage(res.data.message);

        setMessage2("");
      }
    setLoading(false);
  };
  const upLoadProgress = async () => {
      setLoading2(true);
      const res = await axios.post("http://localhost:4000/start-process"); // Replace with your server URL
      if (res.status === 200) {
        setLoading2(false);
        setMessage("");
        setMessage2(res.data.message);
        setProgress(0);
      }
    setLoading2(false);
  };
  console.log(loading, loading2);
  return (
    <div>
      <div>
        <h2>Download File</h2>
        {!message ? (
            <button onClick={dowonLoadProgress} disabled={loading}>
                {loading ? "Downloading..." : "Start Download"}
            </button>
          ) : null}
        <br />
        <div>{message}</div>
      </div>
      {message ? (
        <div style={{ marginTop: "20px" }}>
            <h2>Upload Progress</h2>
            <progress max="100" value={progress}></progress>
            <p>{`${progress}%`}</p>

            <button onClick={upLoadProgress} disabled={loading2}>
                {loading2 ? "Uploading..." : "Start Upload"}
            </button>
        </div>
         ) : null}

      <br />
      <br />
        <div>{message2}</div>
    </div>
  );
}
