import React from 'react'
import Header from '../components/Header'

const HeaderContainer = () => {
    return (
        <Header>
            <Header.Title/>
            <Header.Search/>
        </Header>
    )
}

export default HeaderContainer
