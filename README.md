# Project 2-Bill Split

## Description
Bill Split is an application that will allow users to create and post events or bills. 
This allows users to quickly and easily request and receive money from their friends and family. 
Each user has a profile from which they can view and edit their events as well as create new events to share. 
From the explore page, users can see all events submitted and support any event of choice.

## User Story

As a user, I want to be able to create group events or bills to split costs with friends and family easily. 
As a user, I want to be able to invite other users via email to join and view budget and event or bill details.
As a user, I need this app to provide a secure login for protecting personal information that I am sharing with my friends and family.
As a user, I need this app to allow a single user to own or belong to many groups and for groups to have and/or share many users. 

WHEN I visit the site for the first time
THEN I am presented with Bill Split logo and the option to sign up/log in
WHEN I click on the signup or login, a modal will appear to create or enter name, email and password
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am taken to the user profile where I am presented to with a form to create a new bill
WHEN I click on create
THEN I click on the home button where I am presented with event name, created by and date created and description of event
WHEN I click on a specific event, I'm directed to the events page where I can delete that event or invite another user to split the bill
THEN I am taken to the explore page and presented all events submitted by clicking the home button
WHEN I click on the logout button 
THEN I am presented with the login page

### Usage
* Node.js and Express.js to create RESTful API
* Handlebars.js as a template engine
* Mysql and sequelize ORM for the database
* GET and POST routes retrieving and rendering new data
* MVC paradgm
* Authentication express-session and cookies
* .env to protect API keys and sensitive data

Deployed to Heroku:


