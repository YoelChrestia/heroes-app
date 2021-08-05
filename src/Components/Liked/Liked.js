import React, { useEffect, useState } from 'react'
import { Card } from '../Card/Card'
import './liked.css'

export const Liked = ({allData, LikeHeroe, isOpen, setIsOpen, favorites}) => {

    
    const[cardsLiked, setCardsLiked] = useState([]);

    const handleOpen = () =>{
        setIsOpen(!isOpen);
    } 

    useEffect(() =>{
        setCardsLiked(favorites);
    }, [allData, favorites]);

    return (
        <section className={`liked ${isOpen ? "" : "liked-close"}`}>
            <nav className="liked-nav">
                <div className="liked-title">
                    <div className="liked-title__img">
                        <img src="./assets/medium-heart/medium-heart.svg" alt="liked cards"/>
                    </div>
                    <p>Liked</p>
                </div>
                <button className={`liked-dropdown ${isOpen ? "" : "dropdown-active"}`} onClick={handleOpen}>
                    <img src="./assets/arrow-up/arrow-up.svg" alt="liked dropdown"/>
                </button>
            </nav>
                {   cardsLiked[0] ?
                    <div className={`card-grid-liked ${isOpen ? "" : "dpnone"}`}>
                    {cardsLiked.map(e=>{
                        return <Card
                        id={e.id}
                        key={e.id}
                        img={e.images.sm}
                        name={e.name}
                        realname={e.biography.fullName}
                        power={e.powerstats.strength}
                        isLiked={e.liked}
                        LikeHeroe={LikeHeroe}
                        />
                    }) }</div> :
                    <div className={`dont-likes ${isOpen ? "" : "dpnone"}`}>
                        <img src="./assets/big-heart/big-heart.svg" alt="Big Like"/>
                        <p>You haven't liked any superhero yet</p>
                    </div>
                }           
        </section>
    )
}