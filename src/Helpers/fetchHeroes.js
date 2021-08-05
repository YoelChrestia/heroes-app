export const fetchHeroes = async () => {
    try{
        const data = await fetch("https://akabab.github.io/superhero-api/api/all.json");
        const json = await data.json();
        return json;
    } catch(error){
        console.log(error);
    }
}