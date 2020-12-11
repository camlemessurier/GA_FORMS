# Global Acoustics Forms


Hi Lance, this is my first version of GA Forms. Sorry about my lack of communication, probably would have been best to have a chat with you before I started this, but anyway. Realise this probably uses some technology outside your normal stack, which I realise is going to be a pain if you ever need to made modifications, and maybe would have been better to build it with the existing GA accounts stack. Probably the most unfamiliar tech I imagine will be the graphql API.

If you think you think it's too much trouble, I could potentially convert it to a REST API, or even build it with whatever you use for GA accounts, although it might take me a while.

As for how you run and host, am not completely sure how you do it, so I hope this is somewhat close. I believe you run everything on a GA server, all in docker containers?

Anyway, let me know your thought and/or issues.

## Getting started

> Will need docker and docker-compose installed

To run in production:

1. Run `docker-compose build` to build docker containers
2. Run `docker-compose up` to start containers
3. Navigate to [localhost:3000](http://localhost:3000) on browser

## Integration

Probably the biggest headache is authentication. For testing, just register and use that profile but for integrating with all actual ga accounts, I think

Believe you probably aleady have a REST API for seeing if a user is in the system and returning their data? Was thinking when users login in my app, just send the username and password, obvs hashed (have used SH256) to your API, and storing only username in GA FORMS database, thus all sensitive data is stored in your database not mine.

## Business Logic

At the moment, I have built a seperate database for all GA forms needs.
  
## Technology Stack

- Language: [Typescript](https://www.typescriptlang.org/)
- ORM: [Typeorm](https://typeorm.io/) 
- API style: [Graphql](https://graphql.org/)
- Graphql server: [Apollo Server](https://github.com/apollographql/apollo-server)
- Graphql client: [Apollo Client](https://github.com/apollographql/apollo-client)
- Web server: [next.js](https://nextjs.org/)
- UI components: [Chakra UI](https://chakra-ui.com/)

## Bugs

- Session

## TODO

- Fix skeletons
- Convert to mysql
- Login functionality
- Email Notifications

## Product Road Map

- Fatigue Assessments
- Take 5's
- SWMS
