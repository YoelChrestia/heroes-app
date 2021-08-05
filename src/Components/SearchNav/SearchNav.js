import React from 'react'
import './searchnav.css'

export const SearchNav = ({inputValue,handleChange,handleSubmit,handleDelete,seeCross}) => {    

    return (
        <main className="allheroes" >
            <nav className="allheroes-nav">
                <p className="allheroes-title">All Superheroes</p>
                <form className="allheroes-form" onSubmit={handleSubmit}>
                    <img src="./assets/search/search.svg" alt="search button" className="search-button"/>
                    <input 
                    type="text"
                    placeholder="Search"
                    value={inputValue}
                    onChange={handleChange}
                    />
                    <img src="./assets/cancel/cancel.svg" alt="cancel search" className={`cancel-button ${ seeCross && "active-cancel-button"}`} onClick={handleDelete}/>
                </form>
            </nav>
        </main>
    )
}