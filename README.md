# JaveScriptTrainning

Web-Reviewer
Learn how the View and Data, Comments and Notifications APIs work by building a light weight web application for Bob, the Reviewer persona.

Table of Contents

Introduction
Our History and Opportunity
What is Social Fabric
The Power of the Cloud
What are we doing?
What's in the Repo already?
Environment
Setup/Usage Instructions
Tools You'll Use
Comments API
Notifications API
Heroku
Objectives
Bare Minimum Requirements
Advanced Content
Nightmare Mode
Contributing
Introduction

Our History and Opportunity

Autodesk has traditionally been a provider of "Tools", primarily for the Designer. We built large desktop tools with deep functionality to create and document various types of designs across a range of industries. Over the years, we've branched out into other areas like Analysis, Reality Capture, 3D Printing, Project Lifecycle Management, On-Site Construction Management, and others. In short, we've started to address the Full Project and all its diverse stakeholders and contributors instead of just focusing on the narrow activity of a particular persona. However, we haven't done a good job of getting those tools to work together in a coordinated way to achieve specific customer workflows across the whole project. Because of the Cloud, the world has changed from file-based workflows to data-centric workflows. The distinct seams in our product portfolio are now a liability. The first company to figure out how to be in the center of all project activity will have a tremendous advantage for many years to come.

What is Social Fabric?

The Social Fabric is a conceptual term that describes how our portfolio of tools can start coordinating with each other to achieve workflows across a diverse set of people and applications. It will connect the tools together and streamline the flow of information across the whole project. It includes common communication workflows like Comments, Markup, and Activities. It also includes the ability to store and share data in the Cloud so that it is part of that rich, data-centric project hub. By plugging into the Social Fabric, all of our apps, including traditional Desktop apps, can communicate and share information across a diverse set of people and tools.

The Cloud gives us a tremendous opportunity to revolutionize the way design projects are done.

The Power of the Cloud

The problem we need to fix is what happens between sessions.

We can define a session as one tool, used by one user persona, doing one atomic piece of work.

The connection between sessions to enable a workflow is the missing thing. In reality these interactions are all social: people communicating with each other, handing off next steps, understanding where they are in the process. Too often, that process entails getting people in the same room for a status meeting in order to be aware of everything that is going on.

The cloud is the connective glue, and we are building the social fabric for the Autodesk eco-system so that we can maximize the value of our product portfolio, increase Project Awareness, and increase Project Velocity for all stakeholders.

What are we doing?

This assignment constitutes the beginning of a multi-sprint journey exploring the cloud based APIs available within the Autodesk ecosystem.

Today you will build a lightweight web application that allows a reviewer to upload a seed file (native binary design file), to view it in the browser and to make comments on the file which will be sent to an editor so they can make the requested changes.

It is again the case that you will reuse parts of your solution to this sprint during the next sprints. Remember to make your code readable/maintainable so that future-you doesn't get angry at present-you for making things messy.

What's in the Repo already?

A bare-bones web application ready to accept your API keys and almost able to view a model with the Autodesk View & Data API. This web application has a basic Node.js server and a JavaScript/HTML5 client.

Environment

Setup/Usage Instructions

Note: If you are an advanced developer, you can skip this section and build your own web app from scratch.

Install dependencies by running npm install in the sprint's root folder

Apply for your own credentials (API keys) for the production server from developer.autodesk.com

Rename or copy the ./credentials_.js file into ./credentials.js

  1│  cp credentials_.js credentials.js
Replace the placeholders with your own keys in credentials.js

  1│
  2│client_id: process.env.CONSUMERKEY || '<replace with your consumer key>',
client_secret: process.env.CONSUMERSECRET || '<replace with your consumer secret>',
Upload one of your models to your account and get its URN using the upload tool

Copy the URN which was generated in the previous step in file /www/js/index.js

  1│var defaultUrn = '<replace with your encoded urn>';
Start the server from the Node.js console, by running node server.js

Admire your (future) work via your local server using a WebGL-compatible browser: http://localhost:3000/

Tools You'll Use

Comments

https://developer.autodesk.com/api/comments/internal/

The comments objects you send to the Comments API via POST request should be in the following form.

  1│
  2│
  3│
  4│
  5│
  6│
  7│
  8│
  9│
 10│
 11│
 12│
 13│
 14│
 15│
 16│
 17│
 18│
 19│
 20│
 21│
 22│
 23│
 24│
 25│
 26│
 27│
 28│
 29│
 30│
 31│
 32│
 33│var comment = {
  "body":"This building seriously needs a flag!",
  "type":"file",
  "privacy":[
    {
      "id":"neeleshv",
      "name":"Neelesh Vaikhary"
    },
    {
      "id":"anupc",
      "name":"Anup"
    }
  ],//addressed to neeleshv & anupc
  "attachment":[
    {
      "id":"a599b9e56c914c159fa939bdd520dbec",
      "name":"foo.jpg",
      "type":"image/jpeg",
      "url":"http://abc.com/foo.jpg",
      "image":"http://abc.com/foo-50x50.jpg"
    }
  ],//pointing to an external file
  "tags":[
    {
      "name":"name1",
      "value":"value1"
    },
    {
      "name":"name2",
      "value":"value2"
    }
  ] //bunch of name values
};
Actually if you are POSTing a comment on file (simple comment) as above, you do not have to specify the "type". For sheet, object or geometry comment you need to specify the appropriate type.

To get you started, here's an example POST request using the comment object above.

  1│
  2│
  3│
  4│
  5│
  6│
  7│
  8│
  9│
 10│$.post({
    url: 'http://developer.api.autodesk.com/comments/v2/resources/{URN}',
    ...
  })
  .success(function(data, status, headers, config){

  })
  .error(function(data, status, headers, config){

  });
The returned response is a comment object with auto-generated details.

  1│
  2│
  3│
  4│
  5│
  6│
  7│
  8│
  9│
 10│
 11│
 12│
 13│
 14│
 15│
 16│
 17│
 18│
 19│
 20│
 21│
 22│
 23│
 24│
 25│
 26│
 27│
 28│
 29│
 30│
 31│
 32│
 33│
 34│
 35│
 36│
 37│
 38│
 39│
 40│
 41│
 42│
 43│
 44│
 45│
 46│
 47│
 48│{
  "id":"urn:adsk.comments:social.comment:7461c2b4320a4d65b29dec4b0c9184fb",
  "status":"open",
  "published":"2011-11-02T21:12:02.634Z"
  "index":"5"
  "body":"This building seriously needs a flag!q",
  "privacy":[
    {
      "id":"neeleshv",
      "name":"Neelesh Vaikhary"
    },
    {
      "id":"anupc",
      "name":"Anup"
    }
  ],//addressed to neeleshv & anupc
  "attachment":[
    {
      "id":"a599b9e56c914c159fa939bdd520dbec",
      "name":"foo.jpg",
      "type":"image/jpeg",
      "url":"http://abc.com/foo.jpg",
      "image":"http://abc.com/foo-50x50.jpg"
    }
  ],//pointing to an external         file
  "tags":[
    {
      "name":"name1",
      "value":"value1"
    },
    {
      "name":"name2",
      "value":"value2"
    }
  ] //bunch of name values
  "published":"2012-06-17T10:46:01.799Z",
  "parent":{
    "id":"Urn%3Aadsk.storage%3Afs.file%3Auser%2F772f1af0a8094bf38249cfbb3b0e8cc4",
    "version":"260478262ab640d5b65071b4a6ed9a54","type":"file"
  },
  "index":"1",
  "consumer":{
    "id":"butterfly",
    "name":"butterfly",
    "type":"consumer"
  },
  "id":"eee0092c458747b7bf164eba781521"
}
Please refer to the Comments.API ‘Appendix - Response Code’ for success and failure codes and what they mean. Reply to a comment can be POSTED by calling the underlying API with the returned URN (Comment id/URN). Also make sure the Content-Type is “plain/text” and not “application/x-www-form-urlencoded”.

Notifications

You can follow the step by step guide

This page provides detail for scopes

A quick summary to get you started:

Get an access token with your consumer key and secret /authentication/v1/authenticate POST

Create a channel with a new channel name /notifications/v1/channel POST

Publish to /notifications/channel/{channelName} POST

Heroku

Heroku (pronounced her-OH-koo) is a cloud application platform that makes it easy to build and deploy web apps. If you don't have one already you will need to sign up for a free account to be able to deploy your app. Heroku provides a downloadable and installable toolbelt that makes it as easy to deploy an app as making a git commit.

Objectives

Understand the power of the cloud
Get familiar with the View & Data, Comments and Notifications APIs
Get familiar with deployment to Heroku
Bare Minimum Requirements

task 1: upload a seed file using the upload tool
task 2: use the Viewer API
task 3: use the Comments API so that the reviewer can add comments
task 4: fire the notification with the Notification API
task 5: deploy your web app to Heroku
Advanced Content

Angularize OR Reactify your solution
Implement the ability to add markup in comments
Add user login via Oxygen like this
Nightmare Mode

Don't use any of the code provided in the repo but instead build your own web-reviewer from scratch
Optionally, you can use the Viewer API Reference to add more functionality to your app.
Contributing

This repository uses semantic versioning. See CONTRIBUTING.md for contribution guidelines.

License

Copyright 2016, Hack Reactor. All rights reserved. Unauthorized distribution of any code contained herein is prohibited.
