import { FixedSizeGrid as Grid } from 'react-window'
import React,{useState, useEffect} from 'react'
import {Card} from '../Card/Card'
import './allheroes.css'

export const AllHeroes = ({allData, LikeHeroe, inputValue}) => {

    // positions related to the break points of the viewport measures
    const[sizesPosition, setSizesPosition] = useState();

    //Array with data searched and regex
    let dataSearched = []; 

    if(inputValue.length > 0){
        const regex = new RegExp(`${ inputValue }`.toLowerCase());
        dataSearched = allData.filter( item => item.name.toLowerCase().match(regex) || item.biography.fullName.toLowerCase().match(regex));
    }
    // -------------->

    //Celds of Grid with Cards
    const Cell = ({ columnIndex, rowIndex, style }) => {

        // Array with All or Searched data according to the input
        let searchedDataOrAll;

        if(inputValue.length > 0){
            searchedDataOrAll = dataSearched;
            console.log("hola")
        }else{
            searchedDataOrAll = allData;
        }
        // -------------->

        return(
            <div style={style}>
            { searchedDataOrAll.length <= (rowIndex * columns + columnIndex) ? "" : //If no complete the row
                 <Card       
                              id={searchedDataOrAll[rowIndex * columns + columnIndex].id}
                              key={searchedDataOrAll[rowIndex * columns + columnIndex].id}
                              img={searchedDataOrAll[rowIndex * columns + columnIndex].images.sm}
                              name={searchedDataOrAll[rowIndex * columns + columnIndex].name}
                              realname={searchedDataOrAll[rowIndex * columns + columnIndex].biography.fullName}
                              power={searchedDataOrAll[rowIndex * columns + columnIndex].powerstats.strength}
                              isLiked={searchedDataOrAll[rowIndex * columns + columnIndex].liked}
                              LikeHeroe={LikeHeroe}
                              /> 
                            }            
            </div>
            )
    }

    // Position according to the viewport
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

    window.addEventListener("resize", listenViewport);

    // Number of columns according to position
    let columns = 4;
        
    if(sizesPosition === 1){
         columns = 4;
    }else if(sizesPosition === 2){
        columns = 3;
    }else if(sizesPosition === 3){
        columns = 2;
    }else if(sizesPosition === 4){
        columns = 1;
    }

    useEffect(() => {

        // Initial Position
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
            rowCount={
                inputValue.length > 0 ? Math.floor((dataSearched.length / columns)+1) : Math.floor((allData.length / columns)+1)
            }
            rowHeight={200}
            width={columns * 280}
        >
            {Cell}
        </Grid>
    );
}