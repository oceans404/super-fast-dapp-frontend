# Super Fast Dapp Frontend

<img width="817" alt="Screen Shot 2022-08-18 at 9 21 51 AM" src="https://user-images.githubusercontent.com/91382964/185419652-abad52ef-68ab-4a7f-93a0-89fb2e80f375.png">

- `git clone https://github.com/oceans404/super-fast-dapp-frontend/`
- `cd super-fast-dapp-frontend`
- `npm i`
- `touch .env`
- Within .env create a REACT_APP_ALCHEMY_ID variable 
  - https://dashboard.alchemyapi.io/ "View Key" for a Polygon Mumbai Network app
  - `REACT_APP_ALCHEMY_ID = 'yourAlchemyApiKey'`
  - `GENERATE_SOURCEMAP=false`
- If you've completed the backend half of this tutorial here https://github.com/oceans404/super-fast-dapp, update your App.js file at `contractAddress` with your contract address
- `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
