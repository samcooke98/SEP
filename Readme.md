# Team Share


## Development Guide
To start: 
 1. Start a mongoDB 
 2. Generate VAPID keys for Push Notification API 
 3. Install dependencies with `yarn`
 4. To Start the development server, run `yarn run dev`

HMR is enabled. This means that as you changes react components, they will update on the client. It also means as you change the routes, the server will reload these routes 

#### To Generate VAPID Keys 



## Build Production
If you want to build production, run `npm run build` then `npm start` will start the production environment. 

## Tests
Tests should go in the __test__ folder, and mirror the source folder. If testing React Components, it is acceptable to write a index.test.js which Jest will pick up in the component folder. 

## Libraries Used
Off the top of my head: 
* React
* Redux
* React-Router 
* Express 
* Mongoose 

## Todo
* Code Splitting
* Vendor Manifest with react, etc to minify size on updates. 
* Redux Dev Tools 

## Hot Module Replacement
Client-side React component hot reloading ✅
Server-side React component hot reloading ✅
Server-side express routes hot reloading ✅
Client side css-modules hot reloading  (TBC)
