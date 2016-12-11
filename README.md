# JaveScriptTrainning

Databases
Bare Minimum Requirements

You'll be working with SQL (Structured Query Language) to interact with a MySQL database. MySQL is a RDBMS (Relational Database Management System) that is incredibly popular and utilizes SQL.

You've already learned to store data for your server-side applications "in-memory" using JavaScript variables and by writing text files to disk. In this sprint, after learning to use SQL to define table schemas and write queries you're going to create a MySQL database to persist data for your chatterbox-server. Persistence you'll recall is the ability to remember data even after the server is restarted, and most applications require it.

SQL Basics

Learn basic SQL by completing [Course] Sqool.

Install and Set Up a Local MySQL Server

For this sprint you'll use MySQL as a RDBMS.

Ensure you have mysql installed by doing which mysql from inside the terminal. If you don't have it, install it using brew install mysql. Having mysql installed also means you'll have access to the mysql.server command and the mysqladmin command, both which you'll be using shortly
Stop any MySQL servers that may already be running (perhaps inadvertently) with mysql.server stop in the terminal
Start up a MySQL server by issuing the mysql.server start command. Be aware that anytime you want to interact with your MySQL databases during development, you will need to have the MySQL server running. Don't be surprised if a bug you come across later is a result of your not running this server when needed.
When you interact with MySQL databases you are always interacting as a specific user. MySQL comes out of the box with a single user already created, and this user is called root. Please take note that this is not synonymous with the 'root' user on your operating system. Although typically you would set up a non-root user, you're going to interact with this MySQL as root.

Create a password for the user named root by using mysqladmin -u root password. You'll be asked to enter and confirm a new password. Make it really short for development purposes. If by chance you have already set up a password for the user named root, you will need to modify the above command to use the p flag such: mysqladmin -u root -p password. Passing in the p flag will result in your being prompted for the database user's existing password. This is also true when using the mysql command and you will become familiar with using it.
Create a MySQL Database From the Interactive Prompt

Invoke the interactive mysql prompt for the running server, logged in as the root user, with the mysql -u root -p command, issuing the password you just created when prompted
From the interactive prompt, CREATE and USE a new database
Create a new table with at least 3 columns, one of them set as a primary key
Use the DESCRIBE <table-name> command to verify the setup of your new table
INSERT some new rows into your new table
Execute several queries
Use UPDATE key word in at least 2 different ways
Exit the interactive prompt
Learn to Use a Schema Visualizer

It's incredibly common to visually design schemas. Doing so allows you to architect your schemas without writing actual code, and to communicate your intentions to team members. Many SQL engineers use very robust IDE-like applications that come with visual schema designers. Learning to use such a tool is a large undertaking and not at scope to the challenges at hand, therefore we will use a much more lightweight, standalone schema visualizer called WWW SQL Designer. Using it:

Create a schema with 2 new tables. Each table needs a primary key defined on one of its columns. One of the tables should have a foreign key defined on one of its columns that will relate it to the other table
Take a screenshot of the schema you designed and be prepared to talk about it with another engineer
In this repo

Now you'll begin actual work on the codebase in this repo. Start by familiarizing yourself with the directories contained in this repo.

server

schema.sql is a skeleton schema file intended to create and use a database, and create new tables within it. Aside from writing SQL at the command line, you can also write it in a file and load it into a running MySQL server. Follow the link and read enough to learn how. In the schema.sql file you will be writing one or more CREATE TABLE statements that will define the structure of your database tables and loading them into your running MySQL server
NOTE: if when running your SQL code from this file, and you find a bug in the schema or how it was generated, you'll want to "drop" all the new tables before running it again. This will reset your database by throwing away all data and schema information, to give you a blank slate before re-running your improved version of the SQL code. Look up how to do this if and when the need arises
app.js will be the entry point for your Node.js web server code and utilizes express, the ubiquitous JavaScript web application framework. Express is an MVC framework but has a little bit of a different take on MVC than Backbone. In Express, the view is considered to be the Express server's response. Code for the models and code for the controllers exist within their own directory, mentioned below. For more information on how Express utilizes MVC, check out the the Getting started section of the Express docs, but remember you're under extreme time pressure for this sprint, and, you'll be getting more Express content in upcoming sprints
server/db/index.js uses the mysql npm module to connect to the database server running on your computer
server/models/index.js defines the messages and users models that your application will use. Skeletons of the models have already been created but you'll have to write out the details for their methods
server/controllers/index.js defines the messages and users controllers that your application will use. Skeletons of the controllers have already been created but you'll have to write out the details for their methods
spec/server-spec.js contains a mocha spec for testing your Node server's ability to read and write the database. This spec is not complete! It contains several lines commented with "TODO". You'll be customizing those lines to match the details of the database tables you create
client

Contains a complete client that is built using React and bundled using Webpack. The entry point for the application when it gets bundled is index.js and the bundle gets placed in client/public/js/bundle.js The Webpack configuration can be seen in the webpack.config.js file.
orm-resources

orm-example.js contains EXAMPLE CODE for you to reference later in the sprint when you start refactoring your Node server to use the Sequelize ORM to read and write data to the MySQL. You'll be learning how ORMs allow you to read and write to the database in more JavaScript-like syntax instead of in raw SQL strings
server-pure-sql

When you begin the part of this sprint where you refactor to use an ORM, you will copy all of the code you have in the server directory into the server-pure-sql directory. This way you will be able to easily present your work on both versions without navigating your repo's commit history
Create MySQL Persistent Storage for Chatterbox App

Design a multi-table schema to hold data for your chatterbox-server
Start by using WWW SQL Designer to visually design your multi-table schema
Edit the file server/schema.sql to define, in SQL, the tables you have visually designed. Load the schema into your MySQL server with mysql -u root < path/to/schema.sql.
Open the mysql interactive prompt and use the SHOW TABLES and DESCRIBE <table-name> to verify that your tables were created correctly
Use npm to install (and save) the mysql npm module using npm install mysql --save. This module will allow your chatterbox-server to interact with your running MySQL server
Take a look at the tests in server/spec/server-spec.js. Before you start hacking on your persistent server, read the tests and try to understand what they're trying to do
NOTE: The tests depend on the details of the schema you created, so you will need to customize the spec file with some of these details before it will run. Look for 'TODO' statements in the spec and make sure to address them all
Put all the pieces together to create a persistent SQL-backed chatterbox-server! Use server/app.js as the entrypoint into your application. You will have to build out the methods in server/models/index.js and server/controllers/index.js.
Have your web server connect to the MySQL database, and use the database connection to store data as messages come in
After storing some new messages, open up the mysql command line prompt, use and query your database to look at the new messages
Manually test your server's persistence by sending some chat messages to your server and then stopping the running Node server. Start your Node server up again, connect to it with the client, and see whether the messages you sent last time are still there!
If you haven't already, make all the unit tests pass
Write more unit tests to provide better test coverage of your application.
Refactor with Sequilize ORM

An ORM (Object-Relational Mapping) is usually a library that does the work of converting between objects in your code and rows in a database, so you don't have to fill your code with boilerplate SQL statements or raw SQL strings.

Read the Sequelize docs and the example code in orm-resources/orm-example.js to understand how the ORM works
Refactor your existing server code to use Sequelize
Make sure your persistent chatterbox-server still passes all the tests it passed before. Since you haven't modified your server's HTTP interface or the database schema (right?), the old unit tests should still work without modification
Note that this is one of the biggest wins earned from writing good tests: they let you refactor and rewrite your code with confidence, since they'll tell you if you broke anything that used to work
Tests

Add at least 2 additional tests inside server/spec/server-spec.js that will better assure future users that your application is behaving as expected.
Advanced Content

Make sure you have a users table in your database. Make up some settings that a user can change, such as text color, font, witty sign-off message, etc. Store these settings in the users table, and when the user returns to using the chatterbox app, make sure to recognize them and apply their persisted settings
But wait - it's bad database design to store the same piece of data, such as a username, in multiple tables. Store the username ONLY in the users table, and use a foreign key to relate messages to the user who said them
What's that? You need to make changes to the table schema, but there's already precious user data stored in those tables that must not be lost? If you were to DROP the table and re-CREATE, your users would be furious! Time to teach yourself the ALTER TABLE command
Add a search feature! Make a page where you can type in a user's name and see everything that they've said, or type in a quotation from a message and find out which user said it
Let me password-protect my chat username so other people can't impersonate me. Add a password column to the users table, and create an interface for a user to register their username and password. Show an error message to anybody who tries to use a registered username without knowing the right password
Read up on indexing, and investigate how it can improve the performance of your queries. Profile a query against a non-primary column. Then index the column and re-run. Optionally, profile similar lookups in a non-relational db
Intro to Mongo

Install the node-mongodb module (npm install mongodb)
Read the sample code in non-relational-resources/mongo-example.js and understand how a Node server interfaces with MongoDB
Read the tests in non-relational-resources/spec/mongo-web-historian-spec.js and understand what they're trying to do
Web Historian Refactor

Copy the source code files from your Web Historian project to this directory
Rewrite your archive server to store data in MongoDB instead of in files. When you're done, you shouldn't need to be using files at all!
Get non-relational-resources/spec/mongo-web-historian-spec.js to pass. This file is not complete; it's just a starting point. You will need to edit parts of it to make it work with your database configuration and your web historian server interface
Ensure that your migration to MongoDB didn't break any of your web historian functionality: copy over the old test specs from your original archive project and make sure they still work with your new version!
Archive a few real sites with your archive server, so that there's some real site data in your MongoDB database. Then, try to do some analysis on those pages, like: how many use jQuery? how many images do they use? etc...
Docs

Relevant SQL Documentation

MySQL CREATE TABLE reference docs
MySQL SELECT reference docs
MySQL INSERT reference docs
Node mysql module docs
Executing SQL statements from a file
A Visual Explanation of SQL Joins
SQLfiddle
MySQL Workbench - robust MySQL design tool
Relevant ORM Documentation

Sequelize ORM for Node
Object Relational Mapping - Wikipedia
