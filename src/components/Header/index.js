/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react'
import './styles/header.scss'
import SearchIcon from '@material-ui/icons/Search'

const Header = ({children}) => {
    return (
        <div className="header container-fluid">
            {children}
        </div>
    )
}

Header.Title = (() => (
    <label className="header__title"><b>MOVIE</b>TIME</label>
))

Header.Search = (({children,...rest}) => {
    const [searchActive, setSearchActive] = useState(false);
    return (
        <div className="header__search">
            <SearchIcon onClick={() => setSearchActive((searchActive) => !searchActive)} />
            <Header.SearchInput active={searchActive} />
        </div>
    )
})

Header.SearchInput = (({active}) => (
    <input type="text" className={active ? 'header__search--active' : 'header__search--input'} placeholder="Search Movie"/>
))

export default Header
