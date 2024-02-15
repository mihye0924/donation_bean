import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import { GlobalStyle } from '@/global.tsx'
import { BrowserRouter } from 'react-router-dom' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
