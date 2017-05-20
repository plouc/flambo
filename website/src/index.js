import React                     from 'react'
//import ReactDOM                  from 'react-dom'
import { render } from 'react-snapshot'
import { BrowserRouter }                from 'react-router-dom'

import App                       from './core/components/App'
import './core/styles/global.css'


render((
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    ),
    document.getElementById('root')
)
