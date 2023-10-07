const express = require("express");
const { google } = require("googleapis");
const fs = require("fs");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const cors = require("cors");
const WebSocket = require("ws");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const Myfunction = require("./Filecontroler/GoogleAuth");


// Create an HTTP server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create a WebSocket server using the same HTTP server
const wss = new WebSocket.Server({ server });

// WebSocket connections
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
    console.log(`Received: ${message}`);
   });
});

function sendProgressUpdate(ws, progress) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ progress }));
  }
}


// Api for downloard
app.post("/start-download", async (req, res) => {
  try {
      const sourceFileId = "1H24_awOiHJ-kyaxOyi4aRDN0bZnrZOZE"; // Here replace your fileId

      const tempDownloadPath = "./temp/downloaded-video.mp4"; 

      // Download the file
      res.setHeader("Content-Type", "application/json");
      await Myfunction.downloadFile(sourceFileId, tempDownloadPath);
      res.json({ message: "Downlord completed", progress: 100 });
    } 
    catch (error) {
      console.error("Error in file transfer process:", error);
      res.status(500).json({ message: "Error in file transfer process" });
    }
})

// api for uploard with chunck 
app.post("/start-process", async (req, res) => {
  try {
      const destinationFolderId = "117EFmqswxoMczhyi6QS3oS6De5kOm0YY"; // Here replace your foldereId
      const tempDownloadPath = "./temp/downloaded-video.mp4";

      // Download the file
      res.setHeader("Content-Type", "application/json");

    // Start the chunked upload with progress callback
    await Myfunction.uploadFileChunked(
        tempDownloadPath,
        destinationFolderId,
        async (progress, fileSize) => {
        
        // Calculate the percentage
        const percentage = (progress / fileSize) * 100;
        // Send progress updates to all connected WebSocket clients

        wss.clients.forEach((client) => {
          sendProgressUpdate(client, percentage);
        });
      }
    );

    // Send a completion message when the upload is finished
    res.json({ message: "Upload complete", progress: 100 });
   } 

  catch (error) {
    console.error("Error in file transfer process:", error);
    res.status(500).json({ message: "Error in file transfer process" });
  }
  
});


