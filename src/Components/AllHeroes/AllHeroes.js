import { FixedSizeGrid as Grid } from 'react-window'
import React,{useState, useEffect} from 'react'
import {Card} from '../Card/Card'
import './allheroes.css'

export const AllHeroes = ({allData, LikeHeroe, inputValue}) => {

    const[sizesPosition, setSizesPosition] = useState();

    let dataSearched = [];

    if(inputValue[0]){
        const regex = new RegExp(`${ inputValue }`.toLowerCase());
        dataSearched = allData.filter( item => item.name.toLowerCase().match(regex) || item.biography.fullName.toLowerCase().match(regex));
    }

    const Cell = ({ columnIndex, rowIndex, style }) => {

        let whoArray = allData;

        if(inputValue[0]){
            whoArray = dataSearched;
        }

        return(
            <div style={style}>
                { whoArray.length <= (rowIndex * 4 + columnIndex) ? <div></div> :
                 <Card       
                              id={whoArray[rowIndex * 4 + columnIndex].id}
                              key={whoArray[rowIndex * 4 + columnIndex].id}
                              img={whoArray[rowIndex * 4 + columnIndex].images.sm}
                              name={whoArray[rowIndex * 4 + columnIndex].name}
                              realname={whoArray[rowIndex * 4 + columnIndex].biography.fullName}
                              power={whoArray[rowIndex * 4 + columnIndex].powerstats.strength}
                              isLiked={whoArray[rowIndex * 4 + columnIndex].liked}
                              LikeHeroe={LikeHeroe}
                              /> 
                              }            
             </div>
            )
    }

    const listenViewport = () => {
        if(window.innerWidth >= 1280){
            setSizesPosition(1);
        }else if(window.innerWidth >= 960){
            setSizesPosition(2);
        }else if(window.innerWidth >= 640){
            setSizesPosition(3);
        }else if(window.innerWidth >= 320){
            setSizesPosition(4);
        } 
    }

    let columns;

    if(sizesPosition === 1){
        columns = 4;
    }else if(sizesPosition === 2){
        columns = 3;
    }else if(sizesPosition === 3){
        columns = 2;
    }else if(sizesPosition === 4){
        columns = 1;
    }

    window.addEventListener("resize", listenViewport);

    useEffect(() => {

        if(window.innerWidth >= 1280){
            setSizesPosition(1);
        }else if(window.innerWidth >= 960){
            setSizesPosition(2);
        }else if(window.innerWidth >= 640){
            setSizesPosition(3);
        }else if(window.innerWidth >= 320){
            setSizesPosition(4);
        } 

        return () => {
            window.removeEventListener("resize", listenViewport);
        }
        
    }, [sizesPosition]);

    return(
        <Grid
            className="grid"
            columnCount={columns}
            columnWidth={280}
            height={600}
            rowCount={inputValue[0] ? (dataSearched.length / columns) + 1 :(allData.length / columns) + 1}
            rowHeight={200}
            width={ columns * 280}
        >
            {Cell}
        </Grid>
    );
}