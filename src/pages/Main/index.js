/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import NavbarContainer from '../../containers/Navbar'
import ShowGridContainer from '../../containers/ShotGrid'
import {fetchMovies} from '../../redux/actions/movies'
import './styles/main.scss'

const Main = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMovies())
    },[])

    return (
        <>
            <NavbarContainer/>
            <ShowGridContainer/>
        </>
    )
}

export default Main
