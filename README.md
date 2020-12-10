# Global Acoustics Forms

Hi Lance, am not completely sure how exactly you run your web apps, so I hope this is somewhat close. I believe you run everything on a GA server, all in docker containers? Also had a go at setting up nginx, but got pretty lost.

At the moment, I have built a seperate database for all GA forms needs.

Also, one issue ATM is login. Just for testing, just register and use that profile but for integrating with all actual ga accounts, I thi

Believe you probably aleady have a REST API for seeing if a user is in the system and returning their data? Was thinking when users login in my app, just send the username and password, obvs hashed (have used SH256) to your API, and storing only username in GA FORMS database, thus all sensitive data is stored in your database not mine.
  
## Technology Stack

- Language: [Typescript](https://www.typescriptlang.org/)
- ORM: [Typeorm](https://typeorm.io/)
- API style: [Graphql](https://graphql.org/) \*\*\* Could potentially convert to REST API to make it easier
- Graphql Server: [Apollo Server](https://github.com/apollographql/apollo-server)
- Graphql Client: [Apollo Client](https://github.com/apollographql/apollo-client)
- Web client: [next.js](https://nextjs.org/)
- Styling: [Chakra UI](https://chakra-ui.com/)

## Bugs

- Session

## TODO

- Dockerise
- Fix skeletons
- Convert to mysql
- Update readme
- Login functionality

## Product Road Map

- Fatigue Assessments
- Take 5's
- SWMS
