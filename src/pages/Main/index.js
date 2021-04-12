import React, {useState, useEffect} from 'react'
import HeaderContainer from '../../containers/Header'
import NavbarContainer from '../../containers/Navbar'
import ShowGridContainer from '../../containers/ShotGrid'
import BannerContainer from '../../containers/Banner'
import FilterContainer from '../../containers/Filter'
import './styles/main.scss'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from "react-router-dom";
import {fetchMovies} from '../../redux/actions/movies'
import moment from 'moment'

const Main = () => {
    const params = useParams()
    const paramsType = params.type
    const [scrolled,setScrolled]= useState(false);
    const dispatch = useDispatch()
    const history = useHistory()
    const { suggest } = useSelector(state => state.suggest)
    const { isLoadingLoadMoreMovies, currentPage, isLoadingMovies, totalPages } = useSelector(state => state.movies)
    const queryUrl = new URLSearchParams(document.location.search.substring(1));
    const queryValue = queryUrl.get("query");
    const queryYearValue = queryUrl.get("year");

    const [activeTab, setActiveTab] = useState({title: 'All', paramsType: 'all'})
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchActive, setSearchActive] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [dateText, setDateText] = useState()

    useEffect(() => {
        if (paramsType !== 'search') {
            const found = tabs.find(item => item.paramsType === paramsType)
            setActiveTab(found || tabs[0])
            dispatch(fetchMovies(found?.paramsType || 'all', currentPage + 1))
        } else {
            dispatch(fetchMovies('search', 1, queryValue, queryYearValue))
            
            setSearchActive(true)
        }
    }, [])

    useEffect(() => {
        setStartDate(queryYearValue)
        if (queryYearValue) {
            const date = moment(`${queryYearValue}-01-01T10:00:00`).toDate()
            setDateText(date)
        }
        setSearchKeyword(queryValue)
    }, [queryValue, queryYearValue])

    useEffect(() => {
        if (startDate) {
            dispatch(fetchMovies('search', 1, queryValue, startDate))
            history.push({
                pathname: '/search',
                search: `?query=${queryValue}&year=${startDate}`
            })
        }
    }, [startDate])

    const tabs = [
        {title: 'All', paramsType: 'all'},
        {title: 'Top Rated', paramsType: 'top-rated'},
        {title: 'Actions', paramsType: 'actions'},
        {title: 'Comedy', paramsType: 'comedy'},
        {title: 'Horror', paramsType: 'horror'},
        {title: 'Romance', paramsType: 'romance'},
        {title: 'Documentaries', paramsType: 'documentaries'},
    ]

    const selectSuggest = (name) => {
        dispatch(fetchMovies('search', 1, name))
        history.push({
            pathname: '/search',
            search: `?query=${name}`
        })
    }

    window.onscroll = () => {
        const offset=window.scrollY;
        const { offsetHeight, scrollTop, scrollHeight } = window.document.documentElement
        
        if (offset > 50 ) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }

        if (offsetHeight + scrollTop === scrollHeight) {
            if (!isLoadingLoadMoreMovies && !isLoadingMovies && currentPage < totalPages) {
                if (paramsType !== 'search') {
                    dispatch(fetchMovies(paramsType || 'all', currentPage + 1))
                } else {
                    dispatch(fetchMovies('search', currentPage + 1, queryValue, startDate))
                }
            }
        }
    }

    return (
        <>
            <HeaderContainer 
                scrolled={scrolled} selectSuggest={selectSuggest} 
                suggest={suggest} searchKeyword={searchKeyword} 
                setSearchKeyword={setSearchKeyword}
                searchActive={searchActive}
                setSearchActive={setSearchActive}
            />
            {paramsType !== 'search' ? (
                <>
                    <BannerContainer/>
                    <NavbarContainer tabs={tabs} paramsType={paramsType} activeTab={activeTab} setActiveTab={setActiveTab} />
                </>
            ) : (<FilterContainer setStartDate={setStartDate} dateText={dateText} setDateText={setDateText} />)}
            <ShowGridContainer/>
        </>
    )
}

export default Main
