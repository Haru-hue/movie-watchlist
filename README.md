# Movie Watchlist
Welcome to the Movie Watchlist project! This application is designed to help users manage and track movies they wish to watch. It showcases a wide array of modern web development technologies and practices. Below you'll find detailed documentation on the setup, structure, and features of this fullstack application.

#Table of Contents
*Overview
*Technologies Used
*Client Side Setup
Server Side Setup
Running the Application
Project Structure
Key Features
Contributing
License
Overview
The Movie Watchlist is a fullstack web application that allows users to search for movies, add them to their personal watchlist, and manage their movie viewing preferences. It leverages both client-side and server-side technologies to deliver a seamless user experience.

Technologies Used
Frontend
Next.js: React framework for server-side rendering and static site generation.
TypeScript: Superset of JavaScript that adds static types.
CSS Modules: Scoped CSS to prevent styling conflicts.
TMDB API: Used for fetching movie data.
Backend
Node.js: JavaScript runtime for building server-side applications.
GraphQL: Query language for APIs, providing a more efficient, powerful, and flexible alternative to REST.
Prisma: Next-generation ORM for database interaction.
PostgreSQL: Relational database management system.
Additional Tools
ESLint: Linting utility to ensure code quality.
Prettier: Code formatter for consistent style.
Jest: Testing framework for unit and integration tests.
Client Side Setup
To set up the client side of the application, follow these steps:

Navigate to the client directory:

bash
Copy code
cd client
Install Dependencies:

bash
Copy code
npm install
Configure Environment Variables:
Create a .env.local file in the client directory and add:

makefile
Copy code
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
Replace your_tmdb_api_key with your actual TMDB API key.

Run the Development Server:

bash
Copy code
npm run dev
The client-side application will run on http://localhost:3000.

Server Side Setup
To set up the server side of the application, follow these steps:

Navigate to the server directory:

bash
Copy code
cd server
Install Dependencies:

bash
Copy code
npm install
Configure Environment Variables:
Create a .env file in the server directory and add:

bash
Copy code
DATABASE_URL=postgresql://user:password@localhost:5432/moviedb
Replace user, password, and moviedb with your PostgreSQL credentials and database name.

Set Up the Database:

bash
Copy code
npx prisma migrate dev
This will set up the database schema based on the Prisma schema defined in prisma/schema.prisma.

Start the Server:

bash
Copy code
npm run dev
The server will run on http://localhost:4000 by default.

Running the Application
To run the fullstack application, ensure both the client and server are set up and running:

Start the Server:

bash
Copy code
cd server
npm run dev
Start the Client:

bash
Copy code
cd client
npm run dev
You can now access the application through the client interface, which interacts with the server-side API for data operations.

Project Structure
Client Side
pages/: Next.js pages, which are automatically routed based on the file structure.
components/: Reusable React components for UI elements.
styles/: CSS modules and global styles.
lib/: Utilities and helper functions.
Server Side
src/: Contains the main source code for the server.
graphql/: Defines the GraphQL schema and resolvers.
prisma/: Prisma client setup for database interactions.
services/: Business logic and API integrations, including TMDB API services.
Key Features
Watchlist Management: Users can add movies to their personal watchlist, mark movies as watched, and remove them as needed.
Movie Search and Details: Utilize the TMDB API to search for movies and view detailed information, including ratings, cast, and crew.
Responsive UI: The application is designed to be fully responsive and works seamlessly on both desktop and mobile devices.
GraphQL API: Efficient data fetching and mutations using GraphQL.
Database Management: Use Prisma ORM for database schema management and interactions with PostgreSQL.
Contributing
We welcome contributions to the Movie Watchlist project! If you have suggestions for improvements or new features, feel free to create an issue or submit a pull request. Please ensure your code follows the existing style and passes all tests.

Steps to Contribute
Fork the repository.
Create a new branch.
Make your changes.
Submit a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

By leveraging a wide array of modern web development technologies and adhering to best practices, the Movie Watchlist project not only delivers a functional and user-friendly application but also showcases the potential and versatility of fullstack development.
