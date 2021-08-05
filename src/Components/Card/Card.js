import React from 'react'
import './card.css'

export const Card = ({id, img, name, realname, power, isLiked, LikeHeroe}) => {

    let valueofpower = power / 10;

    return (
        <div className="card" onClick={() =>{
            LikeHeroe(id)}}>
            <img src={img} alt="background card" className="card-background"/>
            <div className="card-image">
                <img src={img} alt="heroe" className="card-image__heroe"/>
                <div className="card-image__like">
                    {isLiked ? <img src="./assets/medium-filled-heart/medium-filled-heart.svg" alt="don´t like"/> : <img src="./assets/medium-heart/medium-heart.svg" alt="like"/>}
                </div>       
            </div>
            <div className="card-info">
                <p className="card-name">{name}</p>
                <p className="card-realname">Real Name: {realname === "" ? "unknown": realname}</p>
                <div className="card-power">
                    <img src="./assets/fist/fist.svg" alt="strong"/>
                    <p><b>{valueofpower}</b> / 10</p>
                </div>
            </div>
        </div>
    )
}