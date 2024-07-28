# Movie Watchlist
Welcome to the Movie Watchlist project! This application is designed to help users manage and track movies they wish to watch. It showcases a wide array of modern web development technologies and practices. Below you'll find detailed documentation on the setup, structure, and features of this fullstack application.

#Table of Contents
* Overview
* Technologies Used
* Client Side Setup
* Server Side Setup
* Running the Application
* Project Structure
* Key Features
* Contributing
* License

## Overview
The Movie Watchlist is a fullstack web application that allows users to search for movies, add them to their personal watchlist, and manage their movie viewing preferences. It leverages both client-side and server-side technologies to deliver a seamless user experience.

### Technologies Used
#### Frontend
* **Next.js:** React framework for server-side rendering and static site generation.
* **TypeScript:** Superset of JavaScript that adds static types.
* **TMDB API:** Used for fetching movie data.

#### Backend
* **Node.js:** JavaScript runtime for building server-side applications.
* **GraphQL:** Query language for APIs, providing a more efficient, powerful, and flexible alternative to REST.
* **Prisma:** Next-generation ORM for database interaction.
* **PostgreSQL:** Relational database management system.

#### Additional Tools
* **ESLint:** Linting utility to ensure code quality.
* **Prettier:** Code formatter for consistent style.


## Client Side Setup
To set up the client side of the application, follow these steps:
* Navigate to the client directory:
```cd client```

* Install Dependencies:
```npm install```

* Configure Environment Variables:
Create a .env.local file in the client directory and add:
```NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key```

* Replace your_tmdb_api_key with your actual TMDB API key.

* Run the Development Server:
```npm run dev```

The client-side application will run on http://localhost:3000.

## Server Side Setup
To set up the server side of the application, follow these steps:

* Navigate to the server directory:
```cd server```

* Install Dependencies:
```npm install```
* Configure Environment Variables:

** Create a .env file in the server directory and add:
```
DATABASE_URL=postgresql://user:password@localhost:5432/moviedb
```
Replace user, password, and moviedb with your PostgreSQL credentials and database name.

* Set Up the Database:
```
npx prisma migrate dev
```
This will set up the database schema based on the Prisma schema defined in prisma/schema.prisma.

* Start the Server:

```
npm run dev
```
The server will run on http://localhost:4000 by default.

## Running the Application
To run the fullstack application, ensure both the client and server are set up and running:

* Start the Server:
```
cd server
npm run dev
```

* Start the Client:
```cd client
npm run dev
```

You can now access the application through the client interface, which interacts with the server-side API for data operations.

## Project Structure
### Client Side
* `app/:` Next.js pages, which are automatically routed based on the file structure.
* `components/:` Reusable React components for UI elements.
* `styles/:` CSS modules and global styles.
* `utils/:` Utilities and helper functions.

### Server Side
* `src/:` Contains the main source code for the server.
* `schema/:` Defines the GraphQL schema and resolvers.
* `prisma/:` Prisma client setup for database interactions.

## Key Features
* Watchlist Management: Users can add movies to their personal watchlist, mark movies as watched, and remove them as needed.
* Movie Search and Details: Utilize the TMDB API to search for movies and view detailed information, including ratings, cast, and crew.
* Responsive UI: The application is designed to be fully responsive and works seamlessly on both desktop and mobile devices.
* GraphQL API: Efficient data fetching and mutations using GraphQL.
* Database Management: Use Prisma ORM for database schema management and interactions with PostgreSQL.

## Contributing
I welcome contributions to the Movie Watchlist project! If you have suggestions for improvements or new features, feel free to create an issue or submit a pull request. Please ensure your code follows the existing style and passes all tests.

* Steps to Contribute
* Fork the repository.
* Create a new branch.
* Make your changes.
* Submit a pull request.


By leveraging a wide array of modern web development technologies and adhering to best practices, the Movie Watchlist project not only delivers a functional and user-friendly application but also showcases the potential and versatility of fullstack development.
