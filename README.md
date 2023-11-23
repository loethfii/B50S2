# Pemilu Backend

## Installation

1. RUN `npm install`
2. Configure db config, cloudinary config, authroization secret @`.env` file, change `.env_example` to `.env`
3. Create Migration file `npm run migrate:generate`
4. Run Migrate to db(postgresql) `npm run migrate:run`
5. \*Optional Run seeders `npm run seed:run`
6. import `postman.json` to postman application

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| DB Configuration |
| ---------------- |
| DB_PORT          |
| DB_USERNAME      |
| DB_PASSWORD      |
| DB_DATABASE_NAME |

| Cloudinary Configuration |
| ------------------------ |
| CLOUD_NAME               |
| API_KEY                  |
| API_SECRET               |

| Authorization |
| ------------- |
| SECRET_KEY    |

## API Reference

if you have import to the post man you'll see this

![alt text](https://res.cloudinary.com/dp3rsk2xa/image/upload/v1700769955/ivtphz612yfl2yhf2zmc.png)
