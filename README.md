# JaveScriptTrainning

Web Historian
In this sprint, you'll rewrite part of http://archive.org, a web service that archives sites on the internet. Your version will allow users to submit a URL, and you'll archive it (by getting a copy of that website off of the internet and writing it to a local text file) and show them your copy.

This sprint continues a trend towards your relying more and more on already existing software and writing code that ties together a variety of application components.

High Level Goals of this Sprint

Gain exposure to and develop on an application with multiple services
Increase your understanding of what code runs inside a JavaScript interpreter, what does not, and how to organize them together
Increase your understanding and skills around bare Node.js, including:
Using export and require statements to support a well-organized codebase
Interacting with the fs module
Handling HTTP server routing with bare Node for greater understanding of how web servers work
Wrestling and becoming more comfortable with Node.js development callback patterns, especially when chaining asynchronous functions
Gain initial exposure to Promises, using them to make your asynchronous code easier to read and write
Key Concepts

The following terms represent concepts and technologies you'll be working with in this sprint. Familiarize yourself with their meaning, and look for places to use these terms with your pair during work on this sprint.

Host: Computers connected to a network are often called 'hosts'. Although this is generally because the computer 'hosts' information or services that is used by other systems on the network, it is used to describe all networked computers regardless of their function.
Client: Depending upon context, 'client' can refer to software that accesses a service made available by a server or to the device on which that software runs. If the server is on another host, the client accesses it by way of a network.
Server: Depending upon context, 'server' can refer to software ('services') running on a host or it can refer to the host device itself. In either case, the server accepts requests from clients and performs tasks on their behalf.
Servers are often classified by the services they provide. For instance, a web server serves web pages and a file server serves computer files.
In almost all cases, a single host has many services running simultaneously.
Client/Server Model: Refers to the design of applications that use clients and servers. The server provides a function or service to one or many clients, which initiate requests for those services.
Clients in an application usually request services from one server.
Servers provide services to many clients.
Servers communicate with other servers to handle aspects of those client requests they don't provide: database operations, email services, authentication services, for example.
Communication between servers, as in the example above, is sometimes called inter-server or server-to-server communication.
Clients and Servers can be on the same computer but are most often on different hosts. As developers we often run both the server and client parts of our applications on our development workstations while we're coding.
Routing: Parses the url received by a server to identify and trigger target behavior requested by user via that url. Developers map patterns of urls expected from a client to specific routines they want to respond to those requests.
REST: A simplified approach to client/server interaction using 'endpoints' (the non-host portion of URLs like '/products/2' given 'http://mystore/products/2') that are simple, intuitive and which rely on HTTP verbs to differentiate client intention given identical URLs. That is, 'products/2' can delete, edit or just show a product depending upon whether an HTTP request specifies 'DELETE', 'POST', or 'GET' as its method.
Background Jobs: processes that run "behind the scenes". You can "spin up" a new process to solve a problem separately from your primary client/server operations to allow them to continue without interruption. We often use background jobs to run maintenance or other jobs on a set schedule. This is generally more common with operating system scripts and with other programming languages but recent developments in JS have provided us with things like Web Workers which follow this pattern.
daemon (pronounced 'demon'): OS processes that handle background jobs. Think of them as servers for operating system requests. Traditionally daemon names end with the letter d: for example, syslogd is the daemon that implements the system logging facility and sshd is a daemon that services incoming SSH connections.
Cron: a time-based job scheduler used to schedule operating system jobs (commands or shell scripts) to run at fixed times, dates, or on specific intervals. Although cron jobs are typically used to automate system maintenance or administration, it can be used for things like connecting to the Internet and downloading email at regular intervals.
Core Application

Your application will consist of two separate node applications.

The first will be a web service that serves pages over the web using a RESTful API
It can accept URLs of sites that the user wants to archive.
It uses POST requests to save submitted URLS to a single file on your computer.
The second will read the list of URLs from that file and fetch the pages specified by those URLs from the internet, saving each web page into a file on your computer.
Configure this second app to run on a schedule using cron.
What's in this repo

The two above-mentioned node applications live in web/ and workers/, respectively. test and stubs contain code related to the mocha tests.

An archives folder, created when your application is first run, holds the files that the web and worker applications interact with.

You'll see two files in there once that folder is generated:

archives/sites.txt: Your web application will add more URLs to this file and your worker application will read the list whenever it runs.
archives/sites/: Your worker application will add more files to this directory, and your web application will serve these files.
A few notes

HTTP documents are often somewhat broken when they're opened in a different context given that they assume access to CSS and JS files on their hosts. Don't worry about that.
One goal of this sprint is having you think about modularity; that is, breaking things up into nice manageable chunks. It also means making your functions a bit more abstract so they can work with a wide array of inputs. Writing easily maintainable and abstracted code is a critical skill in software engineering. To that end, a 'helper' file has been provided. Use it as much as possible for your abstracted helper functions so that your request handler file stays clean, readable and manageable.

You will be using node's http package to build your server - do not use express or any other framework.

One of the main objectives of this sprint is to get you more practice writing asynchronous JavaScript. With this in mind, do not use the synchronous versions of methods found in various node packages. For example, while using the fs package, use fs.readFile and not fs.readFileSync.

Bare Minimum Requirements

Make the tests pass. (run tests using npm test)
If users submit a page you already have, you should auto-redirect them to either your archived version of that page, or to loading.html if the page has not yet been loaded
Write a script in workers/htmlfetcher.js that uses the code in helpers/archive-helpers.js to download files when it runs (and then exit)
The test for the downloadUrls helper might fail incorrectly if downloads take a long time. If this happens to you, just increase the timeout in the test to a longer wait time
The tests expect your server to handle and return incoming JSON data, but the browsers native form handling will use form-encoding instead of JSON. You can either use jQuery to send JSON from the client, or modify the tests to send form-encoded data
Run the above script every minute by using cron. Keep in mind:
console.log (which uses stdout) won't appear when run from a cronjob. Write logging messages to a file instead
Paths to files or scripts in crontab have to be absolute, not relative
Absolute Path: /Users/UserName/file.html
Relative Path: ./nearby_file.html
Note: most systems provide a means of creating absolute paths that are not host-specific. That is, you can dynamically pull information from the local system to help construct the URL. This allows you to write code that usually doesn't have to be edited when you move an application from one host to another. When developing production applications, you will want to take this approach
Learn promises by completing the 'Bare Miniumum Requirements' of [Course] Promises
Change your functions in helpers/archive-helpers to return promises instead of accept callbacks
Consume your shiny new archive-helpers where appropriate Note: Bluebird is already included in this repo for you
Tests

Write at least 2 new tests in code/test/test.js that will help assure future users this app is working as expected
Example

Project Demo Image

Advanced Content

Make your app capable to store multiple versions of the same site
Show links to the sites you've archived on the main page
Use Redis to replace archives/sites.txt

Redis is an in-memory key-value store. You can run a Redis server and use the redis Node.js module to read and write to the Redis server from inside your Node.js code. With this in mind, you're going to refactor your application to read and write site URLs to and from a Redis server, rather than a text file.

Install redis-server and redis-cli commands onto your computer with brew install redis
Start a Redis server by issuing the redis-server command
In a different terminal window, connect to your running Redis server with the redis-cli command
Research how to SET and GET keys from inside the Redis CLI and try it yourself
You can clear the contents of your running Redis server from inside the CLI by issuing the flushall command
Use npm to install the (most widely-used) JavaScript Redis client with npm install --save redis
Learn how to connect to, read to, and write from a Redis server from inside JavaScript using the JavaScript Redis client
Refactor your Web Historian application to interact with a running redis server, rather than with archive/sites.txt
Helpful Links

URI Parsing with Javascript
A Visual Explanation of SQL Joins
Linux Crontab: 15 Awesome Cron Job Examples
A Conjurer's Guide to Promises (see [Video] Resource)
Promise cookbook
