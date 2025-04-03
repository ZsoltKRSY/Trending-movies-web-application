# Trending Movies Web Application

## Description
Full-stack **ReactJS** application for displaying movies fetched from the public TMDB API.\
Used own **Express backend server** as a proxy to forward API requests.\
Implemented functionality for searching movies by name and persistent storage (MySQL) of search metrics ​​to display trending movies.

## Technical
Architectures, frameworks and tools used:
- MVC architecture
- REST architecture
- Design patterns:
  - Debounce (to reduce API calls for search functionality)
  - Repository
  - Builder
- Backend:
  - Espress.js
  - MySQL + Sequelize
  - dotenv
  - node-fetch
  - CORS
- Frontend:
  - ReactJS (frontend)
  - Tailwind CSS
