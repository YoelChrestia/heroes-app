import React,{useState, useEffect} from 'react';
import { fetchHeroes } from './Helpers/fetchHeroes';
import { AllHeroes } from './Components/AllHeroes/AllHeroes';
import { SearchNav } from './Components/SearchNav/SearchNav';
import MyLoader from './Components/MyLoader/MyLoader';
import { Liked } from './Components/Liked/Liked';

const App =() => {

  const[allData, setAllData] = useState([]);
  const[inputValue, setInputValue] = useState("");
  const[seeCross,setSeeCross] = useState(false);
  const[isOpen, setIsOpen] = useState(true);
  const[favorites, setFavorites] = useState([]);
  const[isLoaded,setIsLoaded] = useState(false);

  const localStorageLikedOpen = "LikedOpen";

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

  const LikeHeroe = (id) =>{

      let isInData = false;

      allData.forEach(e =>{
        if(e.id === id){
          isInData = true;
          if(e.liked === false || e.liked === undefined){

            setFavorites([...favorites, e]);
            const newAllData = allData.filter(e => e.id !== id);
            setAllData(newAllData);
          }

          e.liked = !e.liked;
        }
        
      });

      if(isInData === false){
        favorites.forEach(elem =>{
          if(elem.id === id){
            const favoritesWhitoutActual = favorites.filter(element => element.id !== elem.id);
            setFavorites(favoritesWhitoutActual);

            elem.liked = !elem.liked;
            setAllData([...allData, elem]);
          }   
        });
      }
  }

  useEffect(() => {
      fetchHeroes().then(e =>{
        setAllData(e);
        setIsLoaded(true);
      });

      setIsOpen(JSON.parse(window.localStorage.getItem(localStorageLikedOpen)));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(localStorageLikedOpen,JSON.stringify(isOpen));
  }, [isOpen]);

  allData.sort(function (a, b){
    return a.name.localeCompare(b.name, 'en', { numeric: true })});

  return (
    <>
      <header className="logo">
        <img src="./assets/logo/logo.svg" alt="logo app" />
      </header>
      <Liked
        allData={allData}
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
      <AllHeroes 
        inputValue={inputValue}
        setAllData={setAllData}
        allData={allData}
        LikeHeroe={LikeHeroe}
      /> 
       : <MyLoader className="loader"/>}
    </>
  );
}

export default App;