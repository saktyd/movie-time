import React from 'react'
import './styles/shotgrid.scss'
import {BASE_IMAGE_URL} from '../../constans/api'

const ShotGrid = ({children}) => {
    return (
        <div className="shotgrid container-fluid">
            {children}
        </div>
    )
}

ShotGrid.Card = (({children, ...rest}) => (
    <div className="shotgrid__card" {...rest}>
        {children}
    </div>
))

ShotGrid.CardHeader = (({poster_path}) => (
    <img loading={'eager'} src={BASE_IMAGE_URL+poster_path} className="shotgrid__card--header" alt=""/>
))

ShotGrid.CardBodyHidden = (({overview, ...rest}) => (
    <div className="shotgrid__card--hidden">
        <div className="top-section">
            <ShotGrid.CardBodyTitleScore {...rest}/>
        </div>
        <p className="mid-section">
          {overview}
        </p>
        <div className="bottom-section">
            <button className="button__primaryblue mr10">
                Play Trailer
            </button>
            <button className="button__borderwhite">
                View Info
            </button>
        </div>
    </div>
))

ShotGrid.CardBody = (({...rest}) => (
    <div className="shotgrid__card--body"> 
        <ShotGrid.CardBodyTitleScore {...rest}/>
    </div>
))

ShotGrid.CardBodyTitleScore = (({title, vote_average}) => (
    <>
        <h4 className="title">{title}</h4>
        <p className="score">{vote_average}</p>
    </>
))

export default ShotGrid
