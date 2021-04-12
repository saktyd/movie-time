import React, {useState, useEffect} from 'react'
import HeaderContainer from '../../containers/Header'
import NavbarContainer from '../../containers/Navbar'
import ShowGridContainer from '../../containers/ShotGrid'
import BannerContainer from '../../containers/Banner'
import './styles/main.scss'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from "react-router-dom";
import {fetchMovies} from '../../redux/actions/movies'

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

    const [activeTab, setActiveTab] = useState({title: 'All', paramsType: 'all'})
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchActive, setSearchActive] = useState(false);

    useEffect(() => {
        if (paramsType !== 'search') {
            const found = tabs.find(item => item.paramsType === paramsType)
            setActiveTab(found || tabs[0])
            dispatch(fetchMovies(found?.paramsType || 'all', currentPage + 1))
        } else {
            dispatch(fetchMovies('search', 1, queryValue))
            setSearchKeyword(queryValue)
            setSearchActive(true)
        }
    }, [])

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
                    dispatch(fetchMovies('search', currentPage + 1, queryValue))
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
            {paramsType !== 'search' && (
                <>
                    <BannerContainer/>
                    <NavbarContainer tabs={tabs} paramsType={paramsType} activeTab={activeTab} setActiveTab={setActiveTab} />
                </>
            )}
            <ShowGridContainer/>
        </>
    )
}

export default Main
