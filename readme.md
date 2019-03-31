# Reading Length
Reading Length is a web app that estimates the reading time of any book. The search is enabled by Amazon and estimates are derived from either the book's associated audiobook or page count. Some estimates may be 'verified' by either analyzing the number of words in an e-book, publicly available information, emails from the authors, or from user input on how long it took them to read.

## Technologies used
### Front-end
* NextJS (React and GraphQL)
### Back-end
* Yoga (Apollo and GraphQL)
### Database
* Prisma (GraphQL database wrapper)
* PostgreSQL
### Hosting
* Zeit's Now for the front-end
* A Dokku instance (self-hosted Heroku alternative using Docker) on DigitalOcean for the Prisma and Yoga clients
* Managed PostgreSQL database on DigitalOcean

## Contributing
I welcome contribution to the project in any form, ranging from issues opened on this repository, to pull requests, and even general feedback.

If you do want to contribute code, please branch from the staging branch and rebase before making a pull request. Make sure your code is linted using AirBnB's ESLint config, and be mindful of accessibility. There is no official code of conduct, but don't be a dick. Everyone is welcome to contribute regardless of gender, race, age, nationality, language, etc.

## Installation
Yarn is my preferred package manager. Simply navigate to each project folder (frontend and backend) and do ```yarn install```. Let me know if you need any help beyond this by opening up an issue.

## Deployment
For development deployment, the only hairy step is getting a Prisma instance setup. The Prisma docs are pretty full-featured, you'll just need to deploy the schema and then make the relevant changes for the Yoga server (endpoint, API key, etc.). Anything beyond that will have to go through me, since I don't have any sort of CI/CD set up. Therefore, the 'Staging' and 'Production' steps are mostly for myself to remember how to do the deployment process.

### Prisma (database)
Prior to deploying the schema, you will need a Prisma instance setup and set the environment variables in a variables.env file.
- Navigate to the backend folder ```cd backend```
- Deploy the schema
    - Development: ```yarn run deploy-dev```
    - Staging: ```yarn run deploy-staging```
    - Production: ```yarn run deploy-prod```

### Yoga (backend)
- Navigate to the project root
- Deploy/run the server
    - Development: ```cd backend && yarn run dev```
    - Staging: ```git subtree push —prefix backend heroku-yoga-staging master```
        - For staging deployment, I recommend setting up a Heroku or Dokku instance. Add the git remote and replace 'heroku-yoga-staging' with your remote's name.
    - Production: ```git subtree push —prefix backend dokku master```

### Next (frontend)
To deploy the front-end, I recommend deploying via Zeit's Now.sh platform. There are staging and prod now.json examples, all of the routing in production is done through these. You can mess around with new routes and middleware with server.js, but they likely won't work when deployed to staging or production.
- Navigate to frontend folder
- Deploy/run the server
    - Development: ```yarn run dev```
    - Staging: ```yarn run deploy-staging```
    - Production: ```yarn run deploy-prod```

### Non-www to wwww redirect
An interesting note with Zeit's Now is that redirecting non-www to www hits is a pain to implement via configuration. The direct-to-www folder is my best attempt at providing a 301 redirect preserving the users' intentions. It is a separate deployable with an index.html whose only purpose is being a 301 redirect provider.
