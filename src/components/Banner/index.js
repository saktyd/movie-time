/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { BASE_IMAGE_URL } from '../../constans/api'
import {fetchMoviesBanner, fetchTailerMovie} from '../../redux/actions/movies'
import {useHistory} from 'react-router-dom'
import './styles/banner.scss'

const Banner = () => {
    const dispatch = useDispatch()
    
    const moviesBanner = useSelector(
        state => state.movies.moviesBanner,
    );  

    const handleClickTrailer = (id) => {
        dispatch(fetchTailerMovie(id))
    }

    useEffect(() => {
        dispatch(fetchMoviesBanner())
    }, [])

    return (
        <>
            {moviesBanner && (
                <header className="banner" style={{backgroundImage: `url(${BASE_IMAGE_URL}${moviesBanner?.backdrop_path})`}}>
                    <Banner.Content content={moviesBanner} handleClickTrailer={handleClickTrailer}/>
                </header>
            )}
        </>   
    )
}

Banner.Content = (({handleClickTrailer, content}) => {
    const history = useHistory()
    
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str
    }

    return (
        <div className="banner__content container-fluid">
            <h1 className="banner__content--title">{content?.title || content?.name || content?.original_name}</h1>
            <div className="banner__content--buttons">
                <button className="button__primaryblue mr10" onClick={() => handleClickTrailer(content.id)}>Play Trailer</button>
                <button className="button__borderwhite mr10" onClick={() => history.push({pathname: '/info-movie', search: `?id=${content.id}`})}>View Info</button>
            </div>
            <h1 className="banner__content--description">{truncate(content?.overview, 150)}</h1>
            <h1 className="banner__content--score">{content?.vote_average}</h1>
        </div>
    )
})

export default Banner
