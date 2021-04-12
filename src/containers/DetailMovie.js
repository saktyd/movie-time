/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect} from 'react'
import DetailMovie from '../components/DetailMovie'
import {useDispatch, useSelector} from 'react-redux'
import {fetchDetailMovie, fetchDetailMovieSuccess} from '../redux/actions/movies'

const DetailMovieContainer = () => {
    const distpatch = useDispatch()
    const queryUrl = new URLSearchParams(document.location.search.substring(1));
    const queryId = queryUrl.get("id");

    const detailMovie = useSelector(state => state.movies.detailMovie)

    useEffect(() => {
        distpatch(fetchDetailMovie(queryId))
        return () => {
            distpatch(fetchDetailMovieSuccess(null))
        }
    }, [])

    return (
        <DetailMovie imageBackDrop={detailMovie?.poster_path}>
            {detailMovie ? (
                <>
                    <DetailMovie.Cover imageUrl={detailMovie?.poster_path} ></DetailMovie.Cover>
                    <DetailMovie.Info detail={detailMovie}></DetailMovie.Info>
                </>
            ) : (<></>)}
            
        </DetailMovie>
    )
}

export default DetailMovieContainer
