# GoodWords: Elevating Your World with Positive Vibes 🚀

## Features

- Seamlessly create a new account with a personalized journey
- Effortlessly log in to your account
- Inspire and share with the community by creating a new post
- Explore a wealth of uplifting content by browsing through all posts
- Dive deeper into the essence of each post by viewing them individually
- Spread joy and positivity by liking posts that resonate with you
- Engage in meaningful conversations by commenting on posts
- Stay connected with the community by viewing all comments on a post
- Stay updated and connected with user activities

## Demo

Witness the magic firsthand! Click [here](https://github.com/kryptonpust/goodwords/assets/30733693/fec470a3-94bc-465d-8737-2b10e2783968) for a captivating demo.

## Installation

1. Begin your journey by cloning the repository
2. Customize your experience by setting up your environment with a `.env` file (refer to `env.example` for guidance)
3. Launch the application with ease using `docker-compose up`
4. Seamlessly migrate your data with `docker-compose exec server yarn prisma migrate dev`
5. Embark on your GoodWords adventure by visiting `http://localhost:3000`

## Tech Stack

### Frontend

- React
- Zustand
- Tanstack-router
- GraphQL (Apollo-client)
- Mantine UI
- Mantine-forms
- tabler-icons

### Backend

- NestJS
- Prisma
- GraphQL (Apollo-server)
- Postgres
- Joi
- passport-jwt

## Project Structure

### Docker

- `compose.yml`: Your gateway to the application's ecosystem
- `env.example`: Your key to unlocking the power of environment variables

### Frontend

- `client`: Your portal to the frontend magic
- `src/components`: Where creativity meets functionality
- `src/routes`: Guiding you through your journey with intuitive file-based routes
- `src/hooks/zustand`: Your arsenal of Zustand hooks for state management
- `src/hooks/graphql`: Your gateway to GraphQL queries and mutations
- `src/utils/client`: Streamlining your experience with Apollo client setup
- `src/utils/query`: Unleashing the power of GraphQL queries
- `src/utils/mutations`: Unleashing the power of GraphQL mutations
- `src/utils/utils`: Your toolkit of utility functions
- `src/App.tsx`: Where the magic begins
- `src/main.tsx`: Your entry point to the GoodWords universe
- `Dockerfile.dev`: Your guide to deploying with Docker for development
- `postcss.config.js`: Your secret weapon for Mantine UI's PostCSS configuration

### Backend

- `server`: Your fortress of backend brilliance
- `prisma`: Your treasure trove of Prisma schema and migrations
- `prisma/migrations`: Your path to seamless database migrations
- `prisma/schema.prisma`: Your blueprint for the Prisma schema
- `src`: Your hub of NestJS brilliance
- `src/auth`: Safeguarding your journey with authentication magic
- `src/user`: Nurturing the user experience with dedicated functionality
- `src/post`: Crafting the essence of GoodWords with post-related functionality
- `src/comment`: Fostering engaging discussions with post comment functionality
- `src/like`: Spreading positivity with post liking functionality
- `src/activity`: Tracking and celebrating community activity
- `src/database`: Your gateway to the database world with Prisma client setup
- `src/env-config`: Empowering your application with essential environment variables
- `src/utils`: Your repository of utility functions
- `src/schema.gql`: Defining the GraphQL schema
- `src/app.module.ts`: Orchestrating the NestJS app
- `src/main.ts`: Initiating the NestJS journey
- `Dockerfile.dev`: Your companion for Docker-based development deployment

## Contributing

Join us in spreading positivity and making the world a better place! Whether you spot a bug or have an idea for a new feature, we welcome your contributions. Open an issue or submit a pull request, and let's make GoodWords even better together! 🌟

**Empowered by ChatGPT,** *this markup is elegantly crafted to enhance readability.*

