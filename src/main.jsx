import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Redux
import { Provider } from 'react-redux'
import store from './store/store'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Search from './pages/Search'
import SearchImage from './pages/SearchImage'
import NotFound from './pages/NotFound'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/search',
    element: <Search />
  },
  {
    path: '/s/:id',
    element: <SearchImage />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
)
