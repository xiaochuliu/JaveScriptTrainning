# JaveScriptTrainning

Recast.ly
A designer friend of yours has been kind enough to give you the skeleton of a video player application. It has all the needed styling and React components, but only renders dummy content. Your job is to bring this application to life by hooking it up with data from the YouTube Data API. After completing the Bare Minimum Requirements, you'll be able to live-search, display, and play any video from YouTube.

Recast.ly demo
<img src="https://cloud.githubusercontent.com/assets/6980359/12561585/d24594a8-c355-11e5-9aa9-adb6e2c40a40.gif" alt="Recast.ly demo" title="Recast.ly demo">


High Level Goals of this Sprint

Understand the importance, and experience the benefits of client side libraries by way of building with React
Learn how to think about web apps as components
Learn how to transpile code with Babel's command line tool
Learn popular ES6 features and practice using them
Gain more exposure interacting with a REST API (in this case, the YouTube Data API)
Gain more experience with larger codebase, containing many modules across a variety of files
Thinking in Components

A front-end application built with React is built entirely out of React components (frequently referred to just as components). Components can contain other components, but each component should be responsible for doing only one thing. This mimics best practices for creating functions, objects, and even programs. Making decisions about what components to create and how to organize them is somewhat arbitrary. Through experience and error you will develop more well-formed opinions, and making these kinds of decisions will become easier.

Functioning, but non-interacting versions of the required components for this application are already built. Each component lives in its own file inside of the src/components/ directory. During this sprint you will be transforming these components to interact with each other and the YouTube Data API. Here's how they are organized:

Recast.ly component layout

App - The top level container for the entire application. This is the component that will be rendered to the DOM
Nav - A container component for the top navigation bar
Search - Responsible for knowing and communicating information about the search input field
VideoPlayer - Responsible for playing a single video and displaying information about it
VideoList - A container component responsible for populating video list entry components
VideoListEntry - A component that shows a thumbnail view for a single video. When the title of this video is clicked, that video will be played in the VideoPlayer component
Project set up

npm

This sprint uses npm to manage its dependencies. npm comes bundled with Node, and is another JavaScript package manager that makes it easy for developers to share and reuse code. Even though npm started in the Node ecosystem, it is quickly becoming the default choice for sharing all types of JavaScript code.

If you're comfortable with Bower, you should feel right at home with npm. Understanding a few small differences is all you need to get up and running:

Instead of running bower install you run npm install
npm's configuration file is package.json instead of bower.json
npm downloads packages into node_modules instead of bower_components
npm has no equivalent of .bowerrc
Install this sprint's dependencies:

Install Node.js if you haven't yet.
Run npm install
Babel

In order to take advantage of React's declarative JSX syntax, we need to use a tool called a transpiler. A transpiler converts source code written with non-standard syntax, into to a version of JavaScript that will work in all major environments. Babel is a generic transpiler for JavaScript that can convert both JSX and ES6 syntax.

We're going to use Babel's command line interface to transpile the source code in this sprint. To install it globally, run:

  1│npm install -g babel-cli
The following command will transpile all of the JSX/ES6 files in this sprint into parallel ES5 files in the compiled/ directory.

  1│babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline
This command might seem intimidating, but is similar to passing multiple arguments to a function. Let's break it down:

. tells Babel to transpile all JavaScript files in the current working directory
--out-dir tells Babel to put the transpiled files into the compiled/ folder
--presets tells Babel what kind of transformations to make. es2015 transpiles ES6 syntax, and react transpiles JSX. Each preset is installed as it's own package, with the naming convention babel-preset-*.
--ignore tells Babel to not transpile any files in the the node_modules and compiled directories
--source-maps tells Babel to include source maps with our transpiled code, making debugging much easier. The --presets option tells Babel what kind of transformations to make. es2015 transpiles ES6 syntax, and react transpiles JSX. Each preset is installed as its own package, with the naming convention babel-preset-*.
Inside of index.html and SpecRunner.html, the compiled files are loaded in the script tags. After making any changes to the files in the src/ directory, you must transpile them to see the changes reflected when you refresh your html files.

Transpile all the source files into the compiled directory
This is arduous to do manually after every change. Luckily, Babel has an option that makes this much easier.

Find a way to make babel compile files as they are changed
Live reloading server

In order to boost productivity when developing rich client side applications, this sprint uses a live development server to automatically refresh the browser page as you make changes to your source code.

Install Live Server from npm:

  1│npm install -g live-server
Try it out:

In a new Terminal tab, start the Recast.ly app by running live-server
Make a change in one of the JavaScript files in the src/ directory
Be amazed as your browser should magically refresh with the compiled changes
We'll be covering servers later in extensive detail. For now you can just run this command and ignore the complexity of what it means or how it works.

npm scripts

npm comes with a handy scripting feature that lets you define shell commands inside of package.json. If you want to improve your application's build process, consider completing the following optional task:

Write an npm start script that combines the previous two build steps together
React Dev Tools

Install the React Dev Tools extension for Chrome to make debugging this sprint easier.
Bare Minimum Requirements

Inside of src/index.js, render the App component to the DOM and explore the codebase to get an understanding of each component's responsibility
Read this guide to learn more about thinking in components. This guide uses the old React.createClass syntax to create a class component. Do not worry about the syntax as much as the philosophy of structuring a React app.
Use ES6. There are a few new features that play very nicely with React. Insist on using them throughout this sprint:
Classes
Arrow function expressions, especially to exploit its quality of binding this to the lexical scope
Shorthand object property and method syntax
Template strings
Default parameters
Destructuring
Create a dynamic Video List component

When building out front-end applications, it can be productive to temporarily ignore the complexity of working with real data, and mock out "fake" data instead. Stateless functional components make this easy because they render the same with "real" data from a live API or "fake" data from a file.

You're going to use the sample data in src/data/exampleVideoData.js to build out the stateless functional VideoList and VideoListEntry components.

Include src/data/exampleVideoData.js in index.html so it can be used by your React components
Pass exampleVideoData into the VideoList component
Refactor the VideoList component to dynamically render one VideoListEntry component for each video object in exampleVideoData
Refactor the VideoListEntry component to dynamically render based on the video object it receives
Make sure the tests for VideoList and VideoListEntry are passing. You can open the tests with npm test
When it's all set up, you should see the titles, thumbnails, and descriptions of some React Tutorials on the page. If you notice a Warning in the console about a "unique 'key' prop", know that this has to do with React's performance, but you can ignore it if you wish.

Create a dynamic Video Player component

Videos are played by passing a source url to the iframe tag inside the VideoPlayer component. The video associated with the id included after https://www.youtube.com/embed/ will get played. Because this is also a stateless functional component, we can build it out with our example data.

Pass a single video from exampleVideoData into VideoPlayer
Update VideoPlayer to play the video it is passed and display its title and descriptions
Make sure the tests for VideoPlayer are passing. You can open the tests with npm test
Hook together the Video List and Video Player components

Now it's time to make the stateless functional components interact. In React, sibling components can not directly access each other, so they need the help of a parent component to manage communication between them. In this case, App is the parent component for the sibling components VideoList and VideoPlayer.

If you haven't already, complete [Course] 6ees6ees6ees.
Refactor App into a class component using ES6 classes
Initialize the state of App to keep track of all the videos in the video list and the current video in the player. Pass this state down as props to its children components. Continue to use the example data.
Make it so that when the title of a VideoListEntry is clicked, that video is displayed in the player. Do not add state to any of the functional components.
Make sure all the active tests for App are passing. You can open the tests with npm test
Set up interactions with the YouTube API

You'll need a developer key in order to access videos from the YouTube Data API. This is common practice with third party APIs because they want to keep track of who is accessing their data, enforce rate limits, and even sometimes make money. Access to the YouTube API is free, all you need is a Google Account.

Go to Google's YouTube API
If prompted, select a project or create a new one. It doesn't matter what you name a new project
Click Enable and then Go to Credentials
Select Web browser from the drop-down and the Public data radio button
Give your key any name, leave the optional field blank, and click Create.
Make your key available to the rest of your application from a new file, src/config/youtube.js
Create a reusable API helper

To search for YouTube videos, you'll use the API's Search:list endpoint. To help keep your code organized, write a helper function that is solely responsible for interacting with this endpoint. In lib/searchYouTube.js fill out the searchYouTube function. It should:

Use jQuery to send a GET request to the search endpoint. This is the only time you should use jQuery in this sprint
Accept a callback function that is invoked with the videos array that is returned from hitting the endpoint
Accept an options object with the following properties:
query - the string to search for
max - the maximum number of videos to get, which should default to 5
key - an authorized YouTube Browser API key
Only GET embeddable videos
Make sure all the tests for searchYouTube are passing. You can open the tests with npm test
Initialize the app with live data

Before integrating live data, you should take a minute to appreciate how far you got with the exampleVideoData. Now you can tackle the complexity of starting to use actual data in isolation, and assuming the shape of the live data is the same as the data you mocked out, everything will continue working. If you made your helper correctly, this following section should be simple.

As you've done with other modules, make searchYouTube available for consumption and pass it as a prop to your app
Replace exampleVideoData from the initial state of App with empty initial values, appropriate to the type of values it is expecting
Utilize the componentDidMount lifecycle hook to render your app with live videos returned from searchYouTube
Remove the x from the pending tests in AppSpec.jsx, and make sure all the App tests are passing. You can open the tests with npm test
Implement live-search

Build out Search and update other components:

As a user types into the input box, the VideoList and VideoPlayer components are updated with videos from the YouTube data API that match the value of the input
Debounce ajax requests triggered by the Search component to occur at most once every 500ms. (Imagine if YouTube's API wasn't free :O)
Make sure all the tests for Search are passing. You can open the tests with npm test
Advanced Content

Create a VideoDetails component that makes another request to the YouTube API and renders more complete video information to the page
Create an auto-play toggle button that will automatically start playing the video selected from VideoList
Give each video it's own unique url with the help of React Router
Refactor searchYouTube to use the fetch function to make HTTP requests, instead of $.ajax
Refactor your application to use flux. Redux is a popular implementation of flux you might consider
Use a module loader like webpack or SystemJS and refactor to use ES6 import and export instead of exposing components to the window and adding them as script tags
Resources

The Babel REPL shows you a ES5 representation of ES6/JSX code
ES6 Features
Facebook's React Tutorial
YouTube API
Intro to Redux
