import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './components/AuthProvider';
import { Provider } from "react-redux";
import { store } from "./store";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
  <Provider store={store}>
  <AuthProvider>
    <App />
    </AuthProvider>
    </Provider>
    </BrowserRouter>
);


