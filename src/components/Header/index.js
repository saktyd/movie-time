/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react'
import './styles/header.scss'
import SearchIcon from '@material-ui/icons/Search'
import {useDispatch} from 'react-redux'
import {fetchSuggest} from '../../redux/actions/suggest'
import {fetchMovies} from '../../redux/actions/movies'
import {useHistory} from 'react-router-dom'

const Header = ({scrolled, children}) => {
    return (
        <div className={scrolled ? 'header__scrolled header container-fluid' : ' header container-fluid'}>
            {children}
        </div>
    )
}

Header.Title = (() => {
    const dispatch = useDispatch()
    const history = useHistory()
    const toHomePage = () => {
        dispatch(fetchMovies('all', 1))
        history.push({pathname: '/'})
    }
    return (
        <label onClick={() => toHomePage()} className="header__title"><b>MOVIE</b>TIME</label>
    )
    
})

Header.Search = (({searchActive, setSearchActive, ...rest}) => {
    return (
        <div className="header__search">
            <SearchIcon onClick={() => setSearchActive((searchActive) => !searchActive)} />
            <Header.SearchInput active={searchActive} {...rest} />
        </div>
    )
})

Header.SearchInput = (({active, selectSuggest, suggest, searchKeyword, setSearchKeyword}) => {
    const [suggestActive, setSuggestActive] = useState(false);
    const dispatch = useDispatch()

    const handleKeypress = (e) => {
        if (e.charCode === 13) {  // enter key
            e.preventDefault()
            selectSuggest(e.target.value)
            setSuggestActive(false)
        }
    }

    useEffect(() => {
        if (!active) {
            setSuggestActive(false)
        }
    }, [active])

    useEffect(() => {
        if (searchKeyword) {
            dispatch(fetchSuggest(searchKeyword))
        }
    }, [searchKeyword])

    return (
        <div className={active ? 'header__search--active' : 'header__search--deactive'}>
            <input type="text" value={searchKeyword} onKeyPress={handleKeypress} onChange={({ target }) => setSearchKeyword(target.value)} onFocus={() => setSuggestActive((suggestActive) => !suggestActive)} placeholder="Search Movie"/>
            <div className={suggestActive && suggest && searchKeyword ? 'header__search--suggest' : 'header__search--suggest_deactive'}>
                {suggest?.map((item, i) => (
                    <li key={i} onClick={() => [setSearchKeyword(item.name), selectSuggest(item.name), setSuggestActive(false)]}>{item.name}</li>
                ))}
            </div>
        </div>
    )
})

export default Header
