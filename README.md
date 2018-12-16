# NodePostgreReact

This project is a school project to learn NodeJS and React.
The website build with React, manage accounts and user's projects using API server (NodeJS)

I used create-react-app to build React App and Express to make the node server.

There is differents routes on the server:

| Method | Route                            | Description                                      |
| ------ | -------------------------------- | ------------------------------------------------ |
| POST   | /auth/signIn                     | Login user and get auth token                    |
| POST   | /auth/signUp                     | Register a new user and get auth token           |
| GET    | /users                           | Get data of all users                            |
| GET    | /users/me                        | Get data of connected user (Authorization token) |
| GET    | /users/:uuid                     | Get data of a specific user                      |
| PUT    | /users/:uuid                     | Update user data                                 |
| DELETE | /users/:uuid                     | Delete user account                              |
| GET    | /users/:uuid/projects            | Get data of all user's projects                  |
| GET    | /users/:uuid/projects/:projectId | Get data of a specific user's project            |
| PUT    | /users/:uuid/projects/:projectId | Update a project                                 |
| DELETE | /users/:uuid/projects/:projectId | Delete a project                                 |

## Structure of JSON response

If request is a success :

```
{
    "data": Object | Array,
    "meta": Object,
}
```

If request failure :

```
{
    "error": {
        "message": "An error message"
    }
}
```

## Usage

To launch the app, start first the Node server :
`cd server && npm run dev`

And then launch the react app :
`cd client && npm start`

You can build the react app for production with this command:
`npm build`

**Info:** You can use `yarn` instead of `npm` if you want

## Screenshots

### Sign In/Up

<img src="https://raw.githubusercontent.com/Pyozer/NodePostgreSQLReact/master/demo_img/signUp.png" width="550" alt="Sign Up">

<img src="https://raw.githubusercontent.com/Pyozer/NodePostgreSQLReact/master/demo_img/signIn.png" width="550" alt="Sign In">

### Dashboard

<img src="https://raw.githubusercontent.com/Pyozer/NodePostgreSQLReact/master/demo_img/dashboard.png" width="550" alt="Dashboard">

### Profile

<img src="https://raw.githubusercontent.com/Pyozer/NodePostgreSQLReact/master/demo_img/editProfile.png" width="550" alt="Edit profile">

### Projects

<img src="https://raw.githubusercontent.com/Pyozer/NodePostgreSQLReact/master/demo_img/addProject.png" width="550" alt="Add project">

<img src="https://raw.githubusercontent.com/Pyozer/NodePostgreSQLReact/master/demo_img/editProject.png" width="550" alt="Edit project">

<img src="https://raw.githubusercontent.com/Pyozer/NodePostgreSQLReact/master/demo_img/deleteProject.png" width="550" alt="Delete project">

### Dark theme

<img src="https://raw.githubusercontent.com/Pyozer/NodePostgreSQLReact/master/demo_img/dashboard_dark.png" width="550" alt="Dashboard in dark mode">