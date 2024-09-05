# vzou - Data Structures and Algorithms Simulator

**Note:** This project was originally started by a different team, and we continued the development, adding significant features and improvements, including animations for various algorithms and data structures. The main purpose of this project is to make learning algorithms and data structures more interactive and accessible for students.

## Project Overview

Many students struggle to grasp the explanations of algorithms and data structures from traditional classroom settings. We developed a web-based platform that animates these concepts, providing a more visual and intuitive way to understand how they function.

The platform includes animations for the following:

- Depth-First Search (DFS)
- Bellman-Ford Algorithm
- Prim's Algorithm
- Kruskal's Algorithm
- Breadth-First Search (BFS)
- Dijkstra's Algorithm
- Linked List
- Hash Table

This simulator helps users visualize each step of these algorithms and structures, improving their understanding and learning process.

![Project Overview Image](./img/Project%20Overview%20Image.png)

## Technologies Used

Our project is built using modern web development technologies:

- **Frontend**: React, TypeScript, TailwindCSS, Framer Motion, Redux, D3.js
- **Backend**: Node.js, Express, PostgreSQL, Sequelize
- **Other Tools**: IDEs for development, Node.js environment

![Technology Stack](./img/Technology%20Stack.png)

## Key Features

1. **Interactive Algorithm Animations**: Users can visualize algorithms in action, pause and play, move step by step, and adjust animation speed.
2. **Graphical Data Structure Visualizations**: Clear, step-by-step animations for data structures like linked lists and hash tables.
3. **User Registration and Statistics**: Users can sign up, log in, and user-lecturer can track which algorithms they have explored.
4. **Clean and Responsive UI**: Built using TailwindCSS for responsive design and user-friendly interaction.

![Key Features Image](./img/Key%20Features%20Image.png)

## How to Run the Project

To run the project locally, follow these steps:

### Prerequisites

- Ensure that you have Node.js installed.

### Frontend Setup

1. Clone the repository.
2. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm start
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
     npm run dev-secondary
     ```

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

![Usage Instructions Image](./img/Usage%20Instructions%20Image.png)

## Project Structure

The project consists of two main parts:

- **Frontend**: Contains the core logic for visualizations, user interactions, and UI design. Key files can be found in the `frontend/src` directory.
- **Backend**: Manages user data, login, and statistics. Located in the `backend` directory, the backend is built using Node.js and PostgreSQL.

## Future Development

There are several potential areas for further development:

- **Adding More Algorithms**: Extending the platform to include additional algorithms and data structures.
- **Improving the UI**: Further refining the user experience with more intuitive controls and a cleaner interface.
- **Mobile Version**: Adapting the platform for better mobile compatibility.
