import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import './index.css';
import Authentication from './Modules/Authentication';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <Route path="/" component={Authentication} />
    </BrowserRouter>
  </CookiesProvider>, document.getElementById('root'));

registerServiceWorker();
// https://stackoverflow.com/questions/21633537/javascript-how-to-read-a-hand-held-barcode-scanner-best