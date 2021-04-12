import React, {useState} from 'react'
import ShotGrid from '../components/ShotGrid'
import {useSelector, useDispatch} from 'react-redux'
import {fetchTailerMovie} from '../redux/actions/movies'

const ShotGridContainer = () => {
    const dispatch = useDispatch()
    const movies = useSelector(
        state => state.movies.movies,
    ); 
    
    const [showDiscribe, setShowDiscribe] = useState(false)

    const handleClickTrailer = (id) => {
        dispatch(fetchTailerMovie(id))
    }

    return (
        <ShotGrid>
            {movies?.map((item, i) => (
                <ShotGrid.Card key={i} onMouseEnter={() => setShowDiscribe(i)} onMouseLeave={() =>  setShowDiscribe(false)}>
                    <ShotGrid.CardHeader {...item}/>
                    { showDiscribe === i ? (
                        <ShotGrid.CardBodyHidden {...item} handleClickTrailer={handleClickTrailer} />
                    ) : <ShotGrid.CardBody {...item} />}
                    
                </ShotGrid.Card>
            ))}
        </ShotGrid>
    )
}

export default ShotGridContainer
