import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import {useParams, useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux'
import {fetchMovies} from '../redux/actions/movies'

const NavbarContainer = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const paramsType = params.type
    const tabs = [
        {title: 'All', paramsType: 'all'},
        {title: 'Top Rated', paramsType: 'top-rated'},
        {title: 'Actions', paramsType: 'actions'},
        {title: 'Comedy', paramsType: 'comedy'},
        {title: 'Horror', paramsType: 'horror'},
        {title: 'Romance', paramsType: 'romance'},
        {title: 'Documentaries', paramsType: 'documentaries'},
]
    
    const [activeTab, setActiveTab] = useState({title: 'All', paramsType: 'all'})

    useEffect(() => {
        const found = tabs.find(item => item.paramsType === paramsType)
        setActiveTab(found || tabs[0])
        dispatch(fetchMovies(found?.paramsType || 'all'))
    }, [])

    const switchTab = (item) => {
        setActiveTab(item)
        if (paramsType !== item.paramsType) {
            dispatch(fetchMovies(item.paramsType))
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
