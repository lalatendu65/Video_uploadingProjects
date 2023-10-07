# Video_uploadingProjects


This project utilizes the Google Drive API for downloading and uploading videos. It consists of both a backend server and a frontend application built with React.

## Backend

### Setup

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the required dependencies.
4. Start the server using `nodemon` or `node index.js`.

### Usage

1. Access the API endpoints using a tool like Postman to test the functionality.

#### API Endpoints

- **POST /start-process**: Initiates the file transfer process. Replace the sourceFileId and destinationFolderId in the code with the appropriate values. This endpoint handles both downloading and uploading, and it sends progress updates through WebSocket.

- **POST /start-downlord**: Initiates the download process. Replace the sourceFileId in the code with the appropriate Google Drive file ID.

## Frontend (React)

### Setup

1. Navigate to the `frontend` directory.
2. Run `npm install` to install the required frontend dependencies.
3. Start the frontend development server using `npm start`.

### Usage

1. Access the frontend application in your browser.

### Features

- Displays  progress bars for  upload.
- Allows users to start and monitor the transfer process.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push the changes to your fork.
5. Submit a pull request to the main repository.


