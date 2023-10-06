


const { google } = require("googleapis");

const fs = require("fs");

// ... OAuth2 client setup and other code ...
const refersh_token = "1//04AsVnsuD59UlCgYIARAAGAQSNwF-L9IrzYmQ3lDNF9lNAeLfzqYAp7y4ybfbpLMqLLXfGrjy8dBtqW-ke26NWvawHqpZxvSFPtM"; // Replace with your refresh token

const credentials = require("../client_secret_252521996494-sj7i58c14sbnovrrqjb6q02uqakpmr74.apps.googleusercontent.com.json"); // Replace with your credentials

const { client_id, client_secret, redirect_uris } = credentials.web;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

//Qauth setup for google drive connection 
oAuth2Client.setCredentials({ refresh_token: refersh_token });
const drive = google.drive({
  version: "v3",
  auth: oAuth2Client, // Use the OAuth2 client for authentication
});

//Function to download a file from Google Drive
 const downloadFile= async(fileId, destination) =>{
  const fileStream = fs.createWriteStream(destination);

  const response = await drive.files.get(
    {
      fileId,
      alt: "media",
    },
    { responseType: "stream" }
  );

  return new Promise((resolve, reject) => {
    response.data
      .on("end", () => {
        console.log("Download complete");
        resolve();
      })
      .on("error", (err) => {
        console.error("Error downloading file:", err);
        reject(err);
      })
      .pipe(fileStream);
  });
}



// Function to initiate chunked upload to Google Drive
 const uploadFileChunked= async(file, destinationFolderId, progressCallback)=> {
  const fileSize = fs.statSync(file).size;
  const chunkSize = 10 * 1024 * 1024; // 10MB chunks (you can adjust this size)

  const media = {
    mimeType: "application/octet-stream",
    body: fs.createReadStream(file),
  };

  let progress = 0;

  while (progress < fileSize) {
    console.log("hiiii",progress,"liku",fileSize)
    const start = progress;
    const end = Math.min(progress + chunkSize, fileSize);

    media.body = fs.createReadStream(file, { start, end: end - 1 });

    await drive.files.create({
      resource: {
        name: "ppanchayta Video.mp4", // Change the name as needed
        parents: [destinationFolderId],
      },
      media: media,
      fields: "id",
    });


    progress = end;

    // Update progress via the callback function
    if (progressCallback) {
      progressCallback(progress, fileSize);
    }
  }

  console.log("Upload complete");
}

// Function to send progress updates to connected WebSocket clients
  
module.exports = { uploadFileChunked, downloadFile };