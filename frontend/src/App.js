import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
//import history from './history';

//import Bootstrap from "./vendor/bootstrap-without-jquery";

import './index.css';
import Authenticate from './Components/Authenticate';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <Route path="/" component={Authenticate} />
    </BrowserRouter>
  </CookiesProvider>, document.getElementById('root'));

registerServiceWorker();
// https://stackoverflow.com/questions/21633537/javascript-how-to-read-a-hand-held-barcode-scanner-best