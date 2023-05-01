# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup

    npm install

### Before startup
You need a cloud based MongoDB instance with a MongoDB database ready.

Make sure you have a collection named 'org' in your database that contains at least one organization with the org_id listed in your environment variable (see below).

Setup a .env file with the following variables: MONGO_URL, PORT and ORG

    MONGO_URL= the Mongo URL connection string provided in BlackBoard
    PORT= 3000
    ORG= the orgid (as a string)

### MongoDB Connection Issues
If you get the error "Server selection timed out after 30000 ms" when trying to run the backend, change the MONGO_URL to this: "mongodb+srv://admin:PASS654@cluster0.ymtkdvi.mongodb.net/Backend". 

There seems to be a recent issue from the side of MongoDB Atlas where the cluster will be running properly but isn't able to connect to the collections. Our team was able to connect fine to our database for most of the project until the 30th of April. We knew this wasn't an error on our part since our backend hadn't changed since the last time we successfully connected to the database, and we also got the same error when trying to connect to the database through MongoDB Compass (which had also worked fine previously). When trying to look at the cluster database collections from the Atlas UI, the page would display the message "An error occurred while querying your MongoDB deployment. Please try again in a few minutes". Other people have experienced this issue recently (https://www.mongodb.com/community/forums/t/important-an-error-occurred-while-querying-your-mongodb-deployment-please-try-again-in-a-few-minutes/219163/5) and it seems the only solution is too wait until it fixes itself or creating a support case through the MongoDB Support Portal (which is a paid service). Thus our solution was to create an additional MongoDB Atlas cluster. 

### Compiles and hot-reloads for development

    npm start

## Postman Documentation

Can be found at <https://documenter.getpostman.com/view/23133138/2s83mdJiqh>
