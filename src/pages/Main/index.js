/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import HeaderContainer from '../../containers/Header'
import NavbarContainer from '../../containers/Navbar'
import ShowGridContainer from '../../containers/ShotGrid'
import './styles/main.scss'

const Main = () => {
    return (
        <>
            <HeaderContainer/>
            <NavbarContainer/>
            <ShowGridContainer/>
        </>
    )
}

export default Main
