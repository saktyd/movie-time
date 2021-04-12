import React from 'react'
import Header from '../components/Header'

const HeaderContainer = ({scrolled, ...rest}) => {
    return (
        <Header scrolled={scrolled}>
            <Header.Title/>
            <Header.Search {...rest}/>
        </Header>
    )
}

export default HeaderContainer
