# Simple E-COMMERCE

Simple E-COMMERCE app that imitates basic functionality of e-commerce created with MERN stack.

## Demo

This application is deployed on Heroku & Netlify -> [Link](https://ntpon-simple-ecommerce.netlify.app/)

## Features

### Guest

- [x] Sign up
- [x] Sign in
- [x] Add product to cart

### User

- [x] Create order
- [x] Check my Order
- [x] Update profile
- [x] Update password

### Admin

- [x] Manage (CRUD) user
- [x] Manage (CRUD) category
- [x] Manage (CRUD) author
- [x] Manage (CRUD) publisher
- [x] Manage (CRUD) product & upload image of product
- [x] Mange order & update status of order

## Technologies used

### Frontend

- HTML5
- CSS3
- TypeScript
- React
- Styled-components
- Axios
- Redux & Redux Toolkit
- React Toastify
- React-router-dom
- React-icons
- Swiper

### Backend

- TypeScript
- Node.js
- Express
- Mongodb
- Cloudinary

## Geting started

### Clone repository

```
git clone https://github.com/ntpon/simple-ecommerce.git
cd simple-ecommerce
```

### Client setup

Create a .env file in the client directory and set up the following environment variables

```
REACT_APP_BACKEND_URL='Address of the server backend'
```

Example client .env file

```
REACT_APP_SERVER_URL=http://localhost:3001
```

Install packages and start client

yarn

```
cd client
yarn install
yarn start
```

npm

```
cd client
npm install
npm start
```

### Server setup

Create a .env file in the server directory and set up the following environment variables

```
DB_USER="Mongodb username"
DB_PASSWORD="Mongodb password"
DB_SERVER_NAME="Mongodb address name"
DB_NAME="Mongodb database name"
JWT_KEY="Key for encryption secret of jwt"
PORT="The port the server will run"
CLOUDINARY_CLOUD_NAME="Cloudinary name"
CLOUDINARY_API_KEY="Cloudinary Key"
CLOUDINARY_API_SECRET="Cloudinary api secret key"
FOLDER_NAME="cloudinary Folder name"
```

Example server .env file

```
DB_USER=art
DB_PASSWORD=art@password
DB_SERVER_NAME=@server-name
DB_NAME=em_name
JWT_KEY=key
PORT=3000
CLOUDINARY_CLOUD_NAME=key
CLOUDINARY_API_KEY=key
CLOUDINARY_API_SECRET=key
FOLDER_NAME=em_image
```

Install packages and start server

```
cd client
yarn install
yarn start
```

npm

```
cd client
npm install
npm start
```
