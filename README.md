# QuickNotes 📝

QuickNotes is a simple yet powerful note-taking application designed for seamless and secure note management. It's built on a modern **full-stack** architecture, providing a secure platform for users to create, view, edit, and delete their notes with ease.

-----

## Features ✨

  * **User Authentication**: Secure registration and login functionalities to ensure your notes are private.
  * **CRUD Operations**: Easily **C**reate, **R**ead, **E**dit, and **D**elete notes.
  * **Cloud-based Storage**: Your notes are stored securely in a **MongoDB Atlas** cloud database, accessible from anywhere.

-----

## Tech Stack 💻

### **Frontend**

  * **HTML**: For structuring the web pages.
  * **CSS**: For styling and a clean user interface.
  * **JavaScript**: For dynamic client-side interactions.

### **Backend**

  * **Node.js**: The JavaScript runtime environment.
  * **Express.js**: A fast and minimalist web framework for building the API.

### **Database**

  * **MongoDB Atlas**: A highly scalable and reliable cloud database.

-----

## Getting Started 🚀

Follow these steps to get QuickNotes up and running on your local machine.

### **1. Clone the repository**

Open your terminal and run the following command to clone the project:

```bash
git clone https://github.com/sthuthi21/QuickNotes.git
```

### **2. Setup Environment Variables**

Navigate to the `backend` folder and create a new file named `.env`. Add the following variables:

  * `MONGO_URI`: Your connection string from MongoDB Atlas.
  * `JWT_SECRET`: A secure, random string for JWT authentication.
  * `PORT`: The port number for your server, e.g., `5000`.

### **3. Install Dependencies and Run**

Install the necessary packages and start the backend server:

```bash
# From the root directory
cd backend
npm install
node index.js
```

Then, open the `frontend/login.html` file in your web browser to start using the application.

-----

## Project Structure 📁

The project is organized into two main directories: `backend` and `frontend`.

```
backend/
├── index.js             # Main server file
├── middleware/          # Authentication middleware
├── models/              # MongoDB schemas
└── routes/              # API routes

frontend/
├── login.html           # Login page
├── notes.html           # Notes dashboard
├── register.html        # Registration page
├── css/                 # Stylesheets
└── js/                  # Frontend scripts
```

-----

## Author 🧑‍💻

**Sthuthi Sambath**
