/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

import './styles/detailmovie.scss'
import moment from 'moment'

import React from 'react'
import { BASE_IMAGE_URL } from '../../constans/api'

const DetailMovie = ({imageBackDrop, children}) => {
    return (
        <div className="detailmovie container-fluid" style={{backgroundImage: imageBackDrop ? `url(${BASE_IMAGE_URL}${imageBackDrop})` : ''}}>
            {children}
        </div>
    )
}

 DetailMovie.Cover = (({imageUrl}) => (
    <div className="detailmovie__cover">
        <img loading={'lazy'} src={BASE_IMAGE_URL+imageUrl} alt=""/>
    </div>
 ))

 DetailMovie.Info = (({detail}) => (
    <div className="detailmovie__info">
        <div className="detailmovie__info--title">
            <h1>{detail?.original_title}</h1>
            <span>{detail?.release_date ? `(${moment(detail?.release_date).format('YYYY')})` : ''}</span>
        </div>
        <div className="detailmovie__info--overview">
            <h3>Overview</h3>
            <p>{detail?.overview}</p>
        </div>
    </div>
 ))

export default DetailMovie
