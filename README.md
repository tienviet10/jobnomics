
<h1 align="center">
  <br>
  <a href="https://jobnomics.net/"><img src="https://user-images.githubusercontent.com/70352144/228985158-dbfd0ef1-3df7-4628-8161-5011e6db8cf0.png" alt="ReMe" width="200"></a>
  <br>
  JOBNOMICS
  <br>
</h1>


<h4 align="center">AI-powered job application tracker that automates data collection, organization, and provides tailored interview questions to optimize job search efforts. This frontend application is written in <a href="https://reactjs.org/">React.js</a> + <a href="https://www.typescriptlang.org/">TypeScript</a> and deployed automatically at 3am (EST) through Github actions. The backend, made in Node.js (<a href="https://expressjs.com/">Express.js</a>), can be accessed at <a href="https://github.com/esther-sh-choi/jobnomics-api">Jobnomics backend.</a></h4>

<p align="center">
  <a href="#key-features">Tech Stack & Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#building">Building</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#todo">TODO</a>
</p>

## Tech Stack & Features

* [React.js](https://reactjs.org)
* [TypeScript](https://www.typescriptlang.org/)
* OAuth 2.0 authentication with [Auth0](https://auth0.com/)
* [Redux Toolkit + RTK Query](https://redux-toolkit.js.org/) for global state management and managing network requests
* [React Router](https://reactrouter.com/) for routing
* [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) for drag and drop
* [Material UI](https://mui.com/) for styling
* [React Big Calendar](https://github.com/jquense/react-big-calendar)
* [React Quill](https://github.com/jquense/react-big-calendar), a rich text editor for notes

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

1. Clone the repository

```sh
$ git clone https://github.com/tienviet10/jobnomics.git
```

2. Move to the correct directory

```sh
$ cd jobnomics
```

3. Install dependencies

```sh
$ npm install
```

4. Sign up with Auth0. Add localhost link to Allowed Callback URLs, Allowed Logout URLs, and Allowed Web Origins. Additionally, turn on Refresh Token Rotaion. Finally, create a rule to add email field in the token. + Create an API in Application and ensure to allow Allow Offline Access.


5. Fill out all variables in .env file.

```sh
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENT_ID=
REACT_APP_AUTH0_CALLBACK_URL=
REACT_APP_AUTH0_AUDIENCE=
# REACT_APP_BASE_URL=http://localhost:8080/api/v1/
REACT_APP_BASE_URL=
```

6. Run the application

```sh
$ npm start
```

## Building

Run 'npm run build' and use the newly created 'build' folder for deployment.

## Deployment
- GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD)
- Deploy to Netlify

## TODO

* Allow users to have multiple job boards
* Support different languages
* Expand to different industry
