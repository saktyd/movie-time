import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Youtube from 'react-youtube'
import '../components/Trailer/style/trailer.scss'
import {setTrailerYoutubeKey} from '../redux/actions/movies'


const TrailerContainer = ({}) => {
    const dispatch = useDispatch()
    const youtubeKey = useSelector(state => state.movies.trailerYoutubeKey)

    useEffect(() => {
        setTrailerUrl(youtubeKey)
    }, [youtubeKey])

    const [trailerUrl, setTrailerUrl] = useState('')

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return (
        <div className="trailer" onClick={() => dispatch(setTrailerYoutubeKey(null))} style={{display: !youtubeKey ? 'none' : ''}}>
            {trailerUrl && (<Youtube className="trailer__content" videoId={trailerUrl} opts={opts}></Youtube>)}
        </div>
    )
}

export default TrailerContainer
