import React, {useEffect} from 'react'
import Filter from '../components/Filter'

const FilterContainer = ({setStartDate, setDateText, ...rest}) => {
    useEffect(() => {
        return () => {
            setDateText()
            setStartDate('')
        }
    }, [])
    return (
        <Filter setStartDate={setStartDate} setDateText={setDateText} {...rest}/>
    )
}

export default FilterContainer
