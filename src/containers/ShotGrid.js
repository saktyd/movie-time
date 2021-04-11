import React, {useState} from 'react'
import ShotGrid from '../components/ShotGrid'
import {useSelector} from 'react-redux'

const ShotGridContainer = () => {
    const movies = useSelector(
        state => state.movies.movies,
    ); 
    
    const [showDiscribe, setShowDiscribe] = useState(false)

    return (
        <ShotGrid>
            {movies?.map((item, i) => (
                <ShotGrid.Card key={i} onMouseEnter={() => setShowDiscribe(i)} onMouseLeave={() =>  setShowDiscribe(false)}>
                    <ShotGrid.CardHeader {...item}/>
                    { showDiscribe === i ? (
                        <ShotGrid.CardBodyHidden {...item} />
                    ) : <ShotGrid.CardBody {...item} />}
                    
                </ShotGrid.Card>
            ))}
        </ShotGrid>
    )
}

export default ShotGridContainer
