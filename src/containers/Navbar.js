/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Navbar from '../components/Navbar'
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux'
import {fetchMovies} from '../redux/actions/movies'

const NavbarContainer = ({tabs, paramsType, activeTab, setActiveTab}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const switchTab = (item) => {
        setActiveTab(item)
        if (paramsType !== item.paramsType) {
            dispatch(fetchMovies(item.paramsType, 1))
            history.push(`/${item.paramsType}`)
        }
    }

    return (
        <Navbar>
            {tabs.map((item, i) => (
                <Navbar.Button onClick={() => switchTab(item)} key={i} className={activeTab.title === item.title ? 'nav__active' : ''}>
                    {item.title}
                </Navbar.Button>
            ))}
        </Navbar>
    )
}

export default NavbarContainer
