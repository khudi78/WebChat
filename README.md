# Web Chat Application

A real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This project allows users to connect and chat with different online users in real time.

## Features

- **User Authentication**: Users can register, log in, and manage their profiles.
- **Real-Time Messaging**: Users can send and receive messages instantly using Socket.io.
- **User Directory**: View and connect with different online users.
- **Responsive Design**: The application is designed to work on both desktop and mobile devices.
- **User-Friendly Interface**: A clean and intuitive user interface built with React and Tailwind CSS.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.io

## Installation

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### Clone the Repository

```bash
git clone https://github.com/khudi78/WebChat.git
cd WebChat
```

### Backend Setup

```bash

cd backend
npm install
```
### Create a .env file in the backend directory and add your MongoDB connection string:

```env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
### Start the backend server:

```bash

npm start
```
### Frontend Setup


  ```bash

cd frontend
npm install
npm start
