# TodoListApp

1. Run 'npm init' in command line.

2. Install npm packages 
    "body-parser": "^1.19.0"
    "ejs": "^3.0.2"
    "express": "^4.17.1"
    "lodash": "^4.17.15"
    "mongoose": "^5.9.10" (or above versions)
    example command: $ npm i express
    
3. Create seperate folder for .css and .ejs files
  public -> css -> styles.css
  views -> footer.ejs,header.ejs,list.ejs

4. To Run the code    
 - Open the MongoDB Atlas server by first logging in.
 - Create a cluster with username and pwd.
 - Go to Clusters->connect ->connect with mongoshell -and copy-past the MongoShell command in the commandline and give username and pwd.
 - In the new terminal, go to project folder path and type -> $ nodemon app.js
 - To start the Mongo DB server, give $mongod in command line
 
 
 Link to Mongoose Documentation
 https://mongoosejs.com/docs/deprecations.html#findandmodify
    
    Link to deploying Nodejs Apps in Heroku.
    https://devcenter.heroku.com/articles/deploying-nodejs
