
# My-App

App is live on : https://my-app-dashboard.vercel.app/

This is an application which will have two dashboard views, one for the admin and the other for the normal users. User can create new Ads details and Admin is equipped with power to edit user details, their ad details. The application also provided analytics abiut the data provided to it. It is fully responsive with Login authenticaton, register and forgot password functionality.

Currently, only one admin is there. The credentials for him is as follows:

Email: alex@scrap.com
Password: alex@123




## Run Locally

Clone the project

```bash
  git clone https://github.com/SinghalSaksham/userManagementApp.git
```
For front-end side

Go to the project directory

```bash
  cd my-app
```

Install dependencies

```bash
  npm install
```

Go to pages/helper.s and change BASE_URL to `http://localhost:${YOUR_SERVER_PORT}`
Start the server

```bash
  npm run dev
```

For Back-end side

Go to the project directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Make a new .env file (description is provided below)

Start the server

```bash
  npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`MONGO_URL` It will be URL for connection to MONGO DB

`EMAIL` It will be the email from which otp messages will be sent

`PASSWORD` APP pasword provided by Google for using nodemailer api

`SECRET_KEY` Secret key for jwt token

`PORT` Port on which server will be running on localhost


## Documentation

On visiting the App, Login Page is first encountered. It will ask for email and password registered with the database. It will also check no fields are empty and check the credibility of the credentials provided. If User forgets the password, he/she may click on 'forgot password' and can get otp on the email if that email exists in the database. The OTP will be valid for 5 minutes. If OTP is entered within stipulated time, user get facility to change the password and login with a new password upon successful match of the OTP.

Moreover, if the status of user is set to inactive, he will not be able to log in.

Register link is used for signup, where it asks for username, email, company, password, and revenue Percent. All fields are mandatory. Register functionality also checks if the entered email is already existing in the database.

Any unauthenticated user cannot enter dashboard which has endpoint: '/home'. Once user enters dashboard, he gets a jwt token which is stored in Session storage. Depending upon the role of entered user (whether an admin or a normal user), view of dashboard will be different. Both the users will have Logout functionality as well.

Admin:

The dashboard will have two tabs, Home and Analytics. Home Tab will have details of all users registered with the App. It will have functionality to create user. If admin creates a user, the default password for that user is set 'abc123'. The Pencil icon or edit icon when clicked, show the admin all the details which can be edited (i.e. username, company, revenue Percent, status).
Also username will be clickable. If username is clicked, his Ad details will be shown. It will also show functionality to create Ad. The Home Tab is equipped with Search Functionality. Filters are also provided to see useres depending upon their status (Active or inActive).

The other tab will be of Analytics where admin will see Pie charts showing details of revenue from different users and websites. It will give key details of the user from which maximum revenue is generated and same for website as well showing the website contributing maximum revenue.

Normal User:

The dashboard will have 2 tabs: Home and Analytics. Home tab will show details of different Ads. He may also create new Ad. The Home Tab is equipped with Search Functionality. Filters are also provided to see useres depending upon their status (Active or inActive). The Analytics tab will show different pie charts showing charts on total clicks, Ad Impressions, Avg site viewing time, revenue from different webistes.


