import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const element = <App />;

const appContainer = document.getElementById('portfolio_container');
const root = ReactDOM.createRoot(appContainer);
root.render(element);
