/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect} from 'react'
import './styles/filter.scss'
import FilterIcon from '@material-ui/icons/FilterList'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const Filter = ({setStartDate, dateText, setDateText}) => {
    useEffect(() => {
        if (dateText) {
            const year =  moment(dateText).format('YYYY')
            setStartDate(year)
        }
    }, [dateText])

    return (
        <div className="filter container-fluid">
            <div className="filter__button">
                <FilterIcon/>
                <h4>FILTER:</h4>
                 <div className="filter__by-year">
                    <h5>Year</h5>
                    <DatePicker
                        selected={dateText}
                        onChange={(value) => setDateText(value)}
                        showYearPicker
                        dateFormat="yyyy"
                        maxDate={new Date()}
                        yearItemNumber={9}
                    />
                </div>
            </div>
           
        </div>
    )
}

export default Filter
