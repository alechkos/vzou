<p align="center">
  <img src="https://github.com/user-attachments/assets/d2aa8730-ce64-410c-893e-b87433c8aef3" width="300"/>
</p>

<h1 align="center">Data Structures and Algorithms Simulator</h1>

## Project Overview

> [!NOTE]
> This project was originally started by a previous team ([@gilbenhamo](https://github.com/gilbenhamo), [@yovelal](https://github.com/yovelal), [@eodinzov94](https://github.com/eodinzov94), [@RonSCE](https://github.com/RonSCE)) as a part of their final project, and we continued its development as part of our final project.
> We have added new features and improvements, including animations for various algorithms and data structures.

Many students struggle to grasp explanations of algorithms and data structures in traditional classroom settings.
This project developed a web-based platform that animates these concepts, offering a more visual and intuitive way to understand how they function.
The simulator helps users visualize each step of these algorithms and structures, enhancing their understanding and learning process.
The main goal of this project is to make learning algorithms and data structures more interactive and accessible for students.

In addition to the previously developed animations, we have added the following new ones:

- Depth-First Search (DFS)
- Bellman-Ford Algorithm
- Prim's Algorithm
- Kruskal's Algorithm
- Breadth-First Search (BFS)
- Dijkstra's Algorithm
- Linked List
- Hash Table

https://github.com/user-attachments/assets/e5972e05-9fbb-44c6-81dd-c02f93bb35c9

## Technologies Used

The project is built using modern web development technologies:

- **Frontend**: React, TypeScript, TailwindCSS, Framer Motion, Redux, D3.js
- **Backend**: Node.js, Express, PostgreSQL, Sequelize

<p align="center">
  <img src="https://github.com/user-attachments/assets/3b74ea68-28c0-4048-85e3-c2a5b918f427"/>
</p>

## Key Features

1. **Interactive Algorithm Animations**: Users can visualize algorithms in action, pause and play, move step by step, and adjust animation speed.
2. **Graphical Data Structure Visualizations**: Clear, step-by-step animations for data structures like linked lists and hash tables.
3. **User Registration and Statistics**: Users can sign up, log in, and user-lecturers can track which algorithms students have explored.
4. **Clean and Responsive UI**: Built using TailwindCSS for responsive design and user-friendly interaction.

<p align="center">
  <img src="https://github.com/user-attachments/assets/f1f99ebe-b99a-4467-a8e3-e4681d1910ec"/>
</p>

## Usage Instructions

1. **Registration and Login**: Users must register an account to access the platform.
2. **Choose a Topic**: After logging in, the user can select from three main categories on the homepage:
   - Graphs
   - Data Structures
   - Sorting Algorithms
3. **View Animations**: Once a topic is selected, users can start the animation for a specific algorithm or data structure. Controls include:
   - Play/Pause
   - Step forward/backward
   - Speed adjustment

<details><summary>

## How to Run the Project (click to expand)
</summary>

To run the project locally, follow these steps:

### Prerequisites

- Ensure that you have Node.js and Git installed.
- Clone the repository:
    ```bash
    git clone git@github.com:alechkos/vzou.git
    ```

### Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   - For Node.js version compatibility:
     ```bash
     npm run dev
     ```
   - If the above fails due to version conflicts, try:
     ```bash
     npm run dev2
     ```

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run start
   ```
</details>

## Future Development

There are several potential areas for further development:

- **Adding More Algorithms**: Extending the platform to include additional algorithms and data structures.
- **Improving the UI**: Further refining the user experience with more intuitive controls and a cleaner interface.
- **Mobile Version**: Adapting the platform for better mobile compatibility.
