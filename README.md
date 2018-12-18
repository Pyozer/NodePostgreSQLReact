# NodePostgreReact

This project is a school project to learn NodeJS and React.
The website build with React, manage accounts and user's projects using API server (NodeJS)

I used create-react-app to build React App and Express to make the node server.

There is differents routes on the server:

| Method | Route                       | Description                            | AuthToken |
| ------ | --------------------------- | -------------------------------------- | --------- |
| POST   | /auth/signIn                | Login user and get auth token          | No        |
| POST   | /auth/signUp                | Register a new user and get auth token | No        |
| GET    | /users                      | Get all users                          | No        |
| GET    | /users/me                   | Get connected user (yse Auth Token)    | Yes       |
| GET    | /users/:identifier          | Get specific user by ID                | No        |
| PUT    | /users/:identifier          | Update specific user                   | Yes       |
| DELETE | /users/:identifier          | Delete user account                    | Yes       |
| GET    | /users/:identifier/projects | Get all projects of a specific user    | No        |
| GET    | /projects/                  | Get all projects                       | No        |
| GET    | /projects/:projectId        | Get a specific project                 | No        |
| PUT    | /projects/:projectId        | Update a project                       | Yes       |
| DELETE | /projects/:projectId        | Delete a project                       | Yes       |

When it's require, you must pass your AuthToken as Bearer Token in the header, in 'Authorization'.

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