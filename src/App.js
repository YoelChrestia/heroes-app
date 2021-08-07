import React,{useState, useEffect} from 'react';
import { fetchHeroes } from './Helpers/fetchHeroes';
import { AllHeroes } from './Components/AllHeroes/AllHeroes';
import { SearchNav } from './Components/SearchNav/SearchNav';
import MyLoader from './Components/MyLoader/MyLoader';
import { Liked } from './Components/Liked/Liked';

const App =() => {

  //Array of all Heroes
  const[allData, setAllData] = useState([]);
  //Array of Heroes in the grid
  const[processedData, setProcessedData] = useState([]);
  //Ids of favorites Heroes
  const[idFavorites,setIdFavorites] = useState([]);
  //Search value
  const[inputValue, setInputValue] = useState(""); 
  //Cross of search
  const[seeCross,setSeeCross] = useState(false); 
  // Liked window open/close
  const[isOpen, setIsOpen] = useState(true); 
  //Array of favorites
  const[favorites, setFavorites] = useState([]); 
  // Fetch loaded
  const[isLoaded,setIsLoaded] = useState(false); 

  //Liked Window Localstorage
  const localStorageLikedOpen = "LikedOpen";
  //Favorites ids in Localstorage
  const localStorageFavoritesItem = "FavoritesItem";

  // Input Logic
  const handleChange = (e) =>{
      setInputValue(e.target.value);
      setSeeCross(true);

      if(e.target.value === ""){
        setSeeCross(false);
      }
  }

  const handleDelete = () =>{
      setInputValue("");
      setSeeCross(false);
  }

  const handleSubmit = (e) => {
      e.preventDefault();
  }
  // ------------>

  // Click on Like
  const LikeHeroe = (id) =>{

      let isInProcessedData = false;

      // Search the liked item in data
      processedData.forEach(e =>{
        if(e.id === id){
          isInProcessedData = true;
            setIdFavorites([...idFavorites, e.id]);
        }  
      });

      //from favorites to data
      if(isInProcessedData === false){
        
        idFavorites.forEach(i =>{
          if(i === id){
            const idFavoritesWhitoutActual = idFavorites.filter(e => e !== i);
            setIdFavorites(idFavoritesWhitoutActual);
            
            let elementToUnlike = allData.find(e => e.id === i);
            elementToUnlike.liked = !elementToUnlike.liked;
          }   
        });
      }

      //Open the Liked window when touch a like
      setIsOpen(true);
      //Go to the top
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
  }

  // Load of the all fetch
  useEffect(() => {
      fetchHeroes().then(e =>{
        setAllData(e);
        setProcessedData(e);
        setIsLoaded(true);
      });

      //LocalStorage sets
      setIsOpen(JSON.parse(window.localStorage.getItem(localStorageLikedOpen)));
      setIdFavorites(JSON.parse(window.localStorage.getItem(localStorageFavoritesItem)));
  }, []);

  //Save Localstorage liked window
  useEffect(() => {
    window.localStorage.setItem(localStorageLikedOpen,JSON.stringify(isOpen));
  }, [isOpen]);

  //Set favorites and processedData
  useEffect(() => {
    let newFavorites = [];
    let newProcessedData = [];

    //Check ids and push them to favorites
    idFavorites.forEach(ids =>{
      const coincidences = allData.find(e => e.id === ids);
      if(coincidences !== undefined){
        if(!coincidences.liked){
          coincidences.liked = !coincidences.liked
        }
        newFavorites.push(coincidences);
      }
    });
    
    //Those who are not favorites pushes them to processedData
    allData.forEach(e=>{
      if(!idFavorites.includes(e.id)){
        newProcessedData.push(e);
      }
    });
    
    setFavorites(newFavorites);
    setProcessedData(newProcessedData);

    window.localStorage.setItem(localStorageFavoritesItem,JSON.stringify(idFavorites));
   
  }, [idFavorites, allData]);

  //Order of items
  processedData.sort(function (a, b){
    return a.name.localeCompare(b.name, 'en', { numeric: true })});

  return (
    <>
      <header className="logo">
        <img src="./assets/logo/logo.svg" alt="Logo app" />
      </header>
      <Liked
        LikeHeroe={LikeHeroe}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        favorites={favorites}
      />
      <SearchNav 
        inputValue={inputValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        seeCross={seeCross}
      />
      { isLoaded ?
      <AllHeroes inputValue={inputValue} allData={processedData} LikeHeroe={LikeHeroe}/> 
      :
      <MyLoader className="loader"/>
      }
    </>
  );
}

export default App;