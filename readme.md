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
- Yarn 1^

(This project has not been tested with prior versions and might be unstable)

You can check your dependencies requirement by running the following commands:

```bash
$ node -v
$ npm -v
$ yarn -v
```

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

Last step before the project is up and running; get your bot's token and add it to the .env.example file. Once this is done, you can then choose a prefix for your bot's non-slash commands. Since this project is not running any database yet, no more configuration is required.

Now that all your environment variables are created, rename your ".env.example" to be ".env".

## Start

Now your project is ready ! You'll just have to type the following commands to see your bot wake up 😊

```bash
$ yarn build
$ yarn start
```

And there you go ! Your bot is up and running 😄
