import React from 'react'
import './styles/navbar.scss'

const Navbar = ({children}) => {
    return (
        <div className="nav container-fluid">
            {children}
        </div>
    )
}

Navbar.Button = (({children, ...rest}) => (
    <button {...rest}>
        {children}
    </button>
))

export default Navbar
