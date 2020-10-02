# cloud_Storage_System

## To run the project it requires the following:
###  download and install nodejs version 14.4.0 and yarn version 1.2.1
###  download and install yarn version 1.2.1

## Then run the following commands after you cd to the project directory:
### yarn install
### yarn development 
### the project runs on localhost at the port 3000

## the project covers the following api's:

## User Routes:

### (POST) /api/users 
#### post api to create user it requires the body:
##### { "name":"0Athena" , "email":"put the email and it should be of the following format gh@gh.gh for instance" , "password":"123456" }

### (GET) /api/users 
#### get api to get all users

### (GET) /api/users/:userID
#### get the specific user api where :userID is the objectID of the user and it requires to sign in 

### (UPDATE) /api/users/:userID
#### update the user informations and it requires user to sign in and only the user of the account is authorized to make changes

### (delete) /api/users/:userID
#### delete the user account and it requires user to sign in and only the user of the account is authorized to delete his account

