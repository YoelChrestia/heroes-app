import React from 'react';
import {Card} from '../Card/Card'
import './allheroes.css'

// import MyLoader from '../MyLoader/MyLoader'

export const AllHeroes = ({allData, LikeHeroe,inputValue,setAllData}) =>{

    let newArray = [];

    if(inputValue[0]){
        const regex = new RegExp(`${ inputValue }`.toLowerCase());
        newArray = allData.filter( item => item.name.toLowerCase().match(regex) || item.biography.fullName.toLowerCase().match(regex));
    }

    return(

            <div className="card-grid">
            {  inputValue[0] ?
               newArray.map(e=>{
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
                }) : allData.map(e=>{
                    return <Card
                    id={e.id}
                    key={e.id}
                    img={e.images.sm}
                    name={e.name}
                    realname={e.biography.fullName}
                    power={e.powerstats.strength}
                    isLiked={e.liked}
                    LikeHeroe={LikeHeroe}
                    />})
            }
            </div>
    );
}