import React             from 'react'
import { render }        from 'react-snapshot'
import { BrowserRouter } from 'react-router-dom'
import App               from './core/components/App'
import './core/styles/global.css'
import '../assets/scripts/prism'
import '../assets/styles/prism.css'

render((
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    ),
    document.getElementById('root')
)
