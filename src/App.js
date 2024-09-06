//router
// import IndexRouters from "./router/index"

//scss
import "./assets/scss/socialv.scss"
import "./assets/scss/customizer.scss"
import "./App.css";

// Redux Selector / Action
import { useDispatch } from 'react-redux';

// import state selectors
import { setSetting } from './store/setting/actions'
import { GoogleOAuthProvider } from '@react-oauth/google';

function App(props) {
  const dispatch = useDispatch()
  dispatch(setSetting())

// render will happen on outlet component in the default router page
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="App">
        {/* <IndexRouters /> */}
        {props.children}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
