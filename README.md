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

Test username: test
Test password: test

## Integration

Probably the biggest headache is authentication.
Believe you probably aleady have a REST API for the secure database for seeing if a user is in the system? Or do you have some sort of OAuth thing? Was thinking when users login in my app, just send the username and hashed password (have used SH256), to your API, and storing only username in GA FORMS database, thus all sensitive data is stored in your database not mine.

I also believe you use NGINX? My networking knowledge is a bit poor, am not sure how that all works.

## Business Logic

- Seperate database for all GA Forms data, as to not screw up any other data if I mess something up.

### Incident Report

Have taken a fair bit of liberty with fields I deemed unnecessary. Obviously let me know what one's you want back and I can add them.

Rules:

- Anyone can view incident reports
- You have to be logged in create a new one. If you want to have it so someone else can fill out an incident report for you, I suggest adding a person involved field, however I think it should be the responsibility of the person to create their own.
- Reports cannot be reviewed by the creator, and only once you have entered report.
- Only the creator can edit and delete an incident report.

## Technology Stack

- Database: Postgres ***Will switch out for mysql before deployment***
- Language: [Typescript](https://www.typescriptlang.org/)
- ORM: [Typeorm](https://typeorm.io/) 
- API style: [Graphql](https://graphql.org/)
- Graphql server: [Apollo Server](https://github.com/apollographql/apollo-server)
- Graphql client: [Apollo Client](https://github.com/apollographql/apollo-client)
- Web server: [next.js](https://nextjs.org/)
- UI components: [Chakra UI](https://chakra-ui.com/)

## Bugs

- CSS menu folding not correct when in sm - md view.
- server/src/types.ts: Session bug
- Custom radio buttons do not resect when in edit mode
- Formik touches all field as soon as you touch one, and red bars go around all required fields immediately. This shifts everything by 1px per field as well

## TODO

- Fix skeletons
- Convert to mysql
- Display review status
- Login functionality
- Add logo
- NA option for radio inputs

## Optional features

(If wanted, will take some time to develop)

- Have actioned a seperate field like reviewed, as report is not always actioned upon creation.
- Add multiple witnesses with add button.
- Have personal reviews. For example will show who has reviewed report.
- Email Notifications
- Print functionality
- Search functionality
- More precise pagination (at the moment, just a load more button comes up at bottom if needed)
- Add images

## Product Road Map

- Fatigue Assessments
- Take 5's
- SWMS
