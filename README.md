# JaveScriptTrainning

Shortly Express
Get ready for full-stack app development with Shortly! Shortly is a URL shortener service similar to Bitly - but is only partially finished. Your goal is to build out an authentication system and other features that will enable users to have their own private set of shortened URLs.

You will need to think about how to approach authentication from both a user perspective and a technical perspective. Some questions to think about:

How do I store user and password information securely?
What additional steps will the user need to take when interacting with the application? More specifically, what additional routes will the application need to handle?
What strategies do I need to employ to secure existing site functionality?
How often should the user need to enter their username + password?
What's in this Repo

This repo contains a functional URL shortener designed as a single page app. It's built using React on the client with a Node/Express-based server. The server uses the Bookshelf.js ORM and EJS for templates.

It uses SQLite, a self-contained, serverless, zero-configuration, transactional SQL database engine.

Server side, the repo uses express 4. There are a few key differences between express 3 and 4, foremost that middleware is no longer included in the express module, but must be installed separately.

Client side, the repo includes libraries like react-router, webpack, babel, and React. To transpile the React based front-end enter webpack and if you want it to watch the files and re-transpile when it detects changes enter webpack --watch.

This repo includes some basic server specs using Mocha. It is your job to make all of them pass, but feel free to write additional tests to guide yourself. Enter npm test to run the tests.

Use nodemon so that the server automatically restarts when you make changes to your files. To see an example, use npm start, but see if you can improve on this.

Reference Material

Express 4 API
Express Authentication and Encryption
Sessions and Security - this is a Rails resource, but it's a really good explanation.
Bookshelf.js ORM
Knex Queries for Bookshelf
Beginner's guide to REST
REST and RESTful responses
HTML5 Pushstate
Your Goals

Bare Minimum Requirements

Build a simple session-based server-side authentication system - from scratch:
Make sure that you pass the tests marked as pending (xdescribe) in the spec file.
Add tests for your authentication if necessary.
Use the tests to guide you through the other requirements.
Create a new table users with columns username and password. Consider how you will store this information securely. What models will you need and what behavior will they encapsulate?
Allow users to register for a new account, or to login - build pages for login and sign up, and add routes to process the form data using POST actions.
Add a checkUser helper to all server routes that require login, redirect the user to a login page as needed. Require users to log in to see shortened links and create new ones. Do NOT require the user to login when using a previously shortened link.
Enable sessions so that the user does not need to keep logging in when reloading the page.
Don't forget to give the user a way to log out!
Tests

Write at least 3 new meaningful tests inside of test/ServerSpec.js
Example

Project Demo Image

Advanced Content

Now that you fully understand how to roll your own server-side session-based auth system, swap out the system you built for Passport.

Use an OAuth provider strategy; login via your GitHub account.
NOTE: Passport will conflict with any client-side auth system you've already implemented, so be ready to disable it.
Add error messages:

Let your users know when they've entered incorrect credentials or fail to properly register for a user account.
Nightmare Mode

Build a front-end authentication system:
Handle all login and signup from React instead of relying on server-side redirects and routes.
Convert your server routes into API endpoints. You will need to deliver meaningful errors on the server side, and handle them gracefully on the client side.
Other Challenges

The following challenges are not core to the sprint but if you have time you can give them a try:

Make your site prettier:

Find an image used on the site of the original url and use that instead of the generic icon (hint: use a regular expression or a parser to analyze the HTML document). How will you store this new information?
Create a basic stats page for each link:

Show clicks by time grouped into 5 min intervals (displayed as a table is ok).
Add additional models, routes, views, templates as needed.
Add user-specific stats:

Modify the data schema to support different codes for the same url - so each user can have their own stats for a given url.
Change the stats page so it displays the user's clicks along with a total of all clicks in the database for the same url.
Visualize your stats using D3.
Don't use a templating system:

Stop using EJS entirely.
Implement Server Side Rendering (SSR)

Refactor your project to use SSR with react-router.
