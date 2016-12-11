# JaveScriptTrainning

OSS Uploader
Learn how the OSS and Viewer APIs work.

Table of Contents

Introduction
Stepping Back
What's in the Repo already?
Environment
Setup/Usage Instructions
Tools You'll Use
OSS API
View and Data API
Node Libraries
Objectives
Bare Minimum Requirements
Advanced Content
Introduction

Stepping Back

Last sprint you used this upload tool to upload and process a file for the Autodesk Web Viewer. Today we're going to rebuild some of that functionality and take a dive into the OSS API.

What's in the Repo already?

A bare-bones web application ready to accept your API keys and submit a file using HTML5 form data.

Environment

Setup/Usage Instructions

Install dependencies by running npm install in the sprint's root folder

Apply for your own credentials (API keys) for the internal production server from developer.autodesk.com. NOTE! This time we're on the production server, so make sure you use the production environment to generate keys!

Start the server from the Node.js console, by running npm start or node server.js

Admire your work via your local server using a WebGL-compatible browser: http://localhost:3000/

Tools You'll Use

OSS

Documentation

Viewer

Viewer

Model-Derivative

This Workflow will be helpful.

Node Libraries

Node File System

It's probably useful to point out that Node's http.ClientRequest is a writable stream

Node Path

Unirest

Multer

Note: you don't need to touch multer, this is just for reference if you're curious how the middleware works.

Objectives

Get familiar with the OSS and View & Data APIs
Get familiar with Node File I/O (Node fs)
Write reusable, maintanable library code
Bare Minimum Requirements

Implement the token route on the server, which should recieve a POST request from the client, and generate a token from the provided credentials. Note: The Authentication route is already present in config.js. This might prove useful: Scopes
Complete the libary functions currently missing from the OSS class (utils/oss) so that the upload route works using the OSS documentation. Make sure you're using the config file for your routes so that your code is easily maintainable!
OSS: Create Bucket and Check Bucket
OSS: Upload
OSS: Register (translate)
Work through the Promises mini sprint if not already completed
Refactor the OSS workflow in routes/fileUpload using promises, named callbacks or async
Advanced Content

Add a progress bar to the client for upload status. Note: you'll have to use the OSS resumable upload protocol and request status
Maintain the list of uploaded models in a cookie on the client and automatically list previously uploaded models
Refactor the client file form submission to use filedrop
Add user login via Oxygen like this
