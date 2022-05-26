# Boilerplate for React Admin Web with Redux, Material UI

This is a base source code for continue developing other project.

This repository is being developed for Admin & Dashboard page, but you can also use for other purposes (have to refactor structure of source code).

## Main features

- `React` version `17.0.2`
- Main UI: `Material-UI` 5.0 framework
- Call API from server with `axios`
- Manage global state with `redux` and `redux/toolkit`
- Handle form validation with `formik`

## Before starting

**Clone this project into your local disk**

```
git clone git@github.com:gerpann/gerpan-react-admin-redux-boilerplate.git
```

## Requirements

- `Node.js` version &ge; `14` (recommend `lts` version)

I recommend you install `yarn` at global scope before running this project

```
npm install -g yarn
```

But `npm` is totally OK!

## File Structure

Current structure of this project

```
gerpan-react-admin-redux-boilerplate
.
├── .eslintrc
├── .gitignore
├── .prettierrc
├── .editorconfig
├── .env.example
├── .gitignore
├── jsconfig.json
├── package.json
├── yarn.lock
├── public
└── src
    ├── assets
    ├── __mocks__
    ├── components
    │   ├── Account
    │   ├── Dashboard
    │   ├── Product
    │   ├── Setting
    │   └── User
    ├── configs
    ├── features
    │   ├── authen
    │   └── product
    ├── icons
    ├── layouts
    ├── mixins
    ├── pages
    │   ├── Account
    │   ├── Authen
    │   ├── Banner
    │   ├── Blog
    │   ├── Cart
    │   ├── Contact
    │   ├── Dashboard
    │   ├── Error
    │   ├── Product
    │   ├── Setting
    │   └── User
    ├── theme
    ├── utils
    ├── App.js
    ├── index.js
    ├── routes.js
    └── serviceWorker.js
```

## Run and Build project

Before run project, you have to determine some keys in environment variables (in `.env` file)

For sample, you can copy `.env.example` file to have your own `.env` file (remember to edit the keys that are appropriate for your project)

```
cp .env.example .env
```

Script to start project for `development`

```
yarn start
```

For production, we usually build project and deploy built source code (contains only static files like HTML, JS, CSS) to a server.

```
yarn build
```

Of course, I had write some other scripts for format code,.... You can find theme in file `package.json`

## Author

**Gerpan**<br/>
Source code base on Devias kit: https://github.com/devias-io/material-kit-react
