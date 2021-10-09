# Discord Utils Bot

This is a small project I made for fun to learn about the Discord api and the DiscordJS wrapper.

At first this was only supposed to be a simple command handler I made because a friend of mine couldn't get to create one, but it might get even better in the future, and maybe be become a full multi-tooling bot :D

## Informations

This project is built entirely with Typescript, and I am trying to use as few external modules as possible.  
For now, I am only planning to add an orm for my database connexion.

## Dependencies

To run this project, you will need the following dependencies:

- NodeJS 16^
- NPM 7^
- Yarn 2^

(This project has not been tested with prior versions and might be unstable)

You can check your dependencies requirement by running the following commands:

```bash
$ node -v
$ npm -v
$ yarn -v
```

And, last but not least, you will need a database to store all the server's data. This project is built using PostgreSQL, and has not been tested with any other relation database.

If your computer is ready to host the code, you can now clone the project using the _git clone_ command:

```bash
$ git clone https://github.com/Zuruuh/discord-utils-bot.git
$ cd discord-utils-bot
```

Now that you downloaded the project, install all the project dependencies by running the yarn install command:

```bash
$ yarn install
```

If everything went correctly, your project should be good to go ! The last thing it needs is configuration...

## Configuration

Last step before the project is up and running; get your bot's token and add it to the .env.example file.  
Next, you will find a DATABASE_URL variable with differents constants in it's value (constants are written in capital letters).  
You will need to replace all theses constants with your actual database connexion string informations.  
If you don't know what each of the constants mean, check the text underneath this one for more informations.

**DB_USER**: Your database user. By default, there should always be a postgres user  
**DB_PASSWORD**: Your database user's password. By default, it should be either null ("") or "root"  
**HOST**: Your database hostname. If you host your database locally, this should be "localhost".  
 Else, you should be able to find something similar on your database provider.  
**PORT**: The port to connect to. If you host your database locally, set this to "5432".  
 Else, you should be able to find the correct port on your database provider  
**DATABASE_NAME**: Your database's name. This name is arbitrary as long as you create your database first.

Now that all your environment variables are created, rename your ".env.example" to be ".env".

## Start

Now your project is ready ! You'll just have to type the following commands to see your bot wake up 😊

```bash
$ yarn p:m:m
$ yarn build
$ yarn start
```

And there you go ! Your bot is up and running 😄
