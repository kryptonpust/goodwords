# GoodWords

Elevate Your World with Good Words 🌟

## Features

- Create a new account using persistent journey
- Login to your account
- Create a new post
- View all posts
- View a single post
- Like a post
- Comment on a post
- View all comments on a post
- view user activity

# Demo

<https://github.com/kryptonpust/goodwords/assets/30733693/fec470a3-94bc-465d-8737-2b10e2783968>

## Installation

- Clone the repository
- Create a `.env` file in the root directory and copy the contents of `env.example` file
- Run `docker-compose up`
- Run `docker-compose exec server yarn prisma migrate dev`
- go to `http://localhost:3000`

## Tech Stack

### Frontend

- React
- Zustand
- Tanstack-router
- GraphQL(Apollo-client)
- Mantine UI
- Mantine-forms
- tabler-icons

### Backend

- NestJS
- Prisma
- GraphQL(Apollo-server)
- Postgres
- Joi
- passport-jwt

## Project Structure

### Docker

- `docker-compose.yml` - Contains the docker-compose file
- `env.example` - Contains the environment variables example file

### Frontend

- `client` - Contains the frontend code
- `src/components` - Contains all the components used in the project
- `src/routes` - Contains all the File based Route used in the project
- `src/hooks/zustand` - Contains all the zustand hooks used in the project
- `src/hooks/graphql` - Contains all the graphql hooks queries and mutations
- `src/utils/client` - Contains all the apollo client setup
- `src/utils/query` - Contains all the graphql queries
- `src/utils/mutations` - Contains all the graphql mutations
- `src/utils/utils` - Contains all the utility functions used in the project
- `src/App.tsx` - Contains the App file
- `src/main.tsx` - Contains the react entry point
- `Dockerfile.dev` - Contains docker dev deployment file
- `postcss.config.js` - Contains the postcss config file for mantine UI

### Backend

- `server` - Contains the backend code
- `prisma` - Contains the prisma schema and migrations
- `prisma/migrations` - Contains all the migrations
- `prisma/schema.prisma` - Contains the prisma schema
- `src` - Contains all the nestjs code
- `src/auth` - Contains all the auth related code
- `src/user` - Contains all the user related code
- `src/post` - Contains all the post related code
- `src/comment` - Contains all the post comment related code
- `src/like` - Contains all the post liking related code
- `src/activity` - Contains all the activity Logging related code
- `src/database` - Contains prisma client setup
- `src/env-config` - Contains the environment variables setup
- `src/utils` - Contains all the utility functions used in the project
- `src/schema.gql` - Contains the graphql schema
- `src/app.module.ts` - Contains the nestjs app module
- `src/main.ts` - Contains the nestjs entry point
- `Dockerfile.dev` - Contains docker dev deployment file

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.
