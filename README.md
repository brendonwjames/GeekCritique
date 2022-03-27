# GeekCritique
GeekCritique is an app designed for users to create posts and reviews centered around video games. The current version of the application allows users to sign up for an account, create and manage their own posts, and create and manage reviews on any post created on the application by all users. The site is Instagram focused, with Yelp and Goodreads influences.

## Software
GeekCritique is an Instragram/Yelp style video game review site built with the following software:

Backend - Python, Flask

Frontend - React/Redux, Javascript

Database - PostgresSQL

Styling - HTML, CSS

## Features
The current version of the site has the following fully implemented features

### Games
Users are able to create a post from anywhere on the site by using the plus (+) icon on their navbar, and immediately be able to see it on the main page feed, or see it listed under their own list of games on their profile page.

<img width="1071" alt="HomePage" src="https://user-images.githubusercontent.com/92548825/160266052-2fa2637f-3786-4b96-b7c1-d26c86731b70.png">

<img width="1065" alt="ProfilePage" src="https://user-images.githubusercontent.com/92548825/160266154-6a01160c-a224-44ba-a2e4-40b4732193bf.png">


### Reviews
Users are able to post a review about any and all games that are posted on the site. Reviews have a text box for users to leave the content of their review, and a rating to choose from 1-5. All games have an average rating and total rating from all reviews left on the game.

<img width="1267" alt="ReviewPage" src="https://user-images.githubusercontent.com/92548825/160266303-4e320cf5-b708-4ddd-a649-b39c747afbb4.png">

### Features in the Works
This project is still currently being improved, with the following features planned, or in progress, for implementation:

Shelves - users will be able to save any game to a shelf, or list, to track and organize posts found on the site.

Followers - users will be able to follow other users, giving them an option to toggle a custom feed based on the other users that have been followed.

Search - users will be able to use a search function to quickly find games that already exist on the site.

AWS - images will be able to be uploaded via AWS services in addition to URL images.


## Installation
To install and start using GeekCritique, follow the instructions below:

1. Clone the repository from the main branch (link directly below)

   ```bash
   git clone https://github.com/brendonwjames/GeekCritique
   ```

2. CD into root of project and install project dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file in the root of your project and add the following lines into the file:
   ```bash
   SECRET_KEY=<your-secret-key-value>
   DATABASE_URL=postgresql://<your-database-user>:<your-user-password>@localhost/<your-database-name>>
   ```

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file. Use the following commands in your terminal:
   ```bash
   A. psql - Enter psql command line
   B. CREATE USER <your-database-user> WITH PASSWORD '<your-user-password>';
   C. CREATE DATABASE <your-database-name> WITH OWNER <your-database-user>
   D. /q - Exit psql command line
   ```

5. Enter your pipenv shell, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. Open up a second terminal, and cd into react-app directory. Use npm install to install required dependecies from package.json

   ```bash
   npm install
   ```

7. Run the server using npm start in the second terminal. The default server runs on localhost:3000. Navigate to localhost:3000 in your browser (if it does not open automatically)

   ```bash
   npm start
   ```

8. Login to the site using the demo user, or sign up for you own account, and explore the site!
