
Seed-sails-angular-es6 is a full-stack JavaScript open-source solution based in new version of javascript for the client side, which provides a solid starting point for [Sails.js](http://sailsjs.org/), [Node.js](http://www.nodejs.org/), [React.js](https://facebook.github.io/react/) and [AngularJS](http://angularjs.org/) based applications. The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components.

## Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble a Seed-sails-angular-es6 application:
* Sails.js - The best way to understand sails.js is through its [Official Website](http://sailsjs.org/), Sails is the most popular MVC framework for Node.js. It is designed for building practical, production-ready Node.js apps in a matter of weeks - not months
* AngularJS - Angular's [Official Website](http://angularjs.org/) is a great starting point. You can also use [Thinkster Popular Guide](http://www.thinkster.io/), and the [Egghead Videos](https://egghead.io/).
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.
* React.js - A javascript library for building user interfaces [React.js Official Website](https://facebook.github.io/react/).

## Prerequisite Technologies
Make sure you have installed all of the following prerequisites on your development machine:

### Linux
* *Node.js* - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* *Git* - Get git using a package manager or [download](http://git-scm.com/downloads/) it.

If you're using ubuntu, this is the preferred repository to use...

```bash
$ curl -sL https://deb.nodesource.com/setup | sudo bash -
$ sudo apt-get update
$ sudo apt-get install nodejs
```

### Windows
* *Node.js* - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* *Redis* - [Download & Install Redis](http://redis.io/), and make sure it's running on the default port (6379).

### OSX
* *Node.js* -  [Download](http://nodejs.org/download/) and Install Node.js or use the packages within brew or macports.
* *git* - Get git [from here](http://git-scm.com/download/mac/).

## Prerequisite packages

* Seed-sails-angular-es6 currently uses Grunt as a build tool and Jspm to manage frontend packages.

* Gulp - You're going to use the [The JavaScript Task Runner](http://gruntjs.com/) to automate your development process.  Make sure you've installed Node.js and npm first, then install grunt globally using npm:

```bash
$ npm install -g grunt-cli
```

* Jspm - You're going to use the [Frictionless browser package management (Jspm)](http://jspm.io/) to automate your development process. Make sure you've installed Node.js and npm first, then install jspm globally using npm:

```bash
$ npm install -g jspm
```

* Sails - You're going to use the [Realtime MVC Framework for Node.js (Sails.js)](http://sailsjs.org/). Make sure you've installed Node.js and npm first, then install sails.js globally using npm:

```bash
$ npm install -g sails
```


### Cloning The Repository
The recommended way to get Seed-sails-angular-es6 is to use git to directly clone the Seed-sails-angular-es6 repository:

```bash
$ git clone https://github.com/alienfernandez/seed-sails-angular-es6
```

## Quick Install
Once you've downloaded the boilerplate and installed all the prerequisites, you're just a few steps away from starting to develop your MEAN application.

The first thing you should do is install the Node.js dependencies. The boilerplate comes pre-bundled with a package.json file that contains the list of modules you need to start your application. To learn more about the modules installed visit the NPM & Package.json section.

To install Node.js dependencies you're going to use npm again, when npm packages are installed will be installed jspm packages automatically. In the application folder run this in the command-line:

```bash
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Finally, when the install process is over, npm will initiate a jspm install command to install all the front-end modules needed for the application

## Running Your Application
After the install process is over, you'll be able to run your application using npm, just run:

```
$ sails lift
```

Your application should run on port 1337 with the *development* environment configuration, so in your browser just go to [http://localhost:1337](http://localhost:1337)

That's it! Your application should be running. To proceed with your development, check the documentation of [sails.js](http://sailsjs.org/documentation/concepts/).

### Running in Production mode
To run your application with *production* environment configuration, execute npm as follows:

```bash
$ npm run prod
```

**...And Keep It Lifted**
You will want to use a tool like [pm2](http://pm2.keymetrics.io/) or [forever](https://github.com/foreverjs/forever) to make sure your app server will start back up if it crashes. Regardless of the daemon you choose, you'll want to make sure that it starts the server as described above.

**Using pm2:**
```bash
$ pm2 start app.js -x -- --prod
```

**Using forever:**
```bash
$ forever start app.js --prod
```

### Troubleshooting
During installation depending on your os and prerequisite versions you may encounter some issues.

Most issues can be solved by one of the following tips, but if you are unable to find a solution feel free to contact us via the repository issue tracker or the links provided below.

#### Update NPM, Jspm or Gulp
Sometimes you may find there is a weird error during install like npm's *Error: ENOENT*. Usually updating those tools to the latest version solves the issue.

* Updating NPM:
```bash
$ npm update -g npm
```

* Updating Gulp:
```bash
$ npm update -g gulp
```

* Updating Jspm:
```bash
$ npm update -g jspm
```

#### Cleaning NPM and Bower cache
NPM and Bower has a caching system for holding packages that you already installed.
We found that often cleaning the cache solves some troubles this system creates.

* NPM Clean Cache:
```bash
$ npm cache clean
```

* Jspm Clean Cache:
```bash
$ jspm cache-clear
```

## Sample Application

The sample application is a simple Articles create, read, update and destroy (CRUD) web site.

## Client-side

* [AngularJS](http://angularjs.org/) -  Single Page Applications (SPAs), declarative templates with data-binding, MVW, MVVM, MVC.
* [Bootstrap 3](http://getbootstrap.com/) - Powerful mobile first front-end framework for faster and easier web development.
* [React.js](https://facebook.github.io/react/) - Building user interfaces, use React as the V in MVC.

## Server-side

* [Sails.js](http://sailsjs.org/) Sails is the most popular MVC framework for Node.js.
* [Passport](http://passportjs.org/) Authentication middleware for Node.js, extremely flexible and modular.

## Data Storage

* Sails bundles a powerful ORM, Waterline, which provides a simple data access layer that just works, no matter what database you're using. In addition to a plethora of community projects, officially supported adapters exist for MySQL, MongoDB, PostgreSQL, Redis, and local disk.

## Tools

* [Grunt](http://gruntjs.com/) - The JavaScript Task Runner, build system automating tasks: minification and copying of all JavaScript files, static images, etc.
* [Jspm](http://jspm.io/) - Package manager for the SystemJS universal module loader.
* [Babel](https://babeljs.io/) - Transpiler for JavaScript best known for its ability to turn ES6.

## Credits

## License
