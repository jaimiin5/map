import { Place } from "./place"

interface searchProps {
    features:{
        properties:{
            place_id: number,
            display_name: string,
        }
        geometry:{
            coordinates:number[]
        }
    }[]

}

export const search = async(term : string)=>{
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=5`);
    const data :searchProps= await res.json();

    console.log(data);

    const searchData : Place[]= data.features.map((features)=>{
        return{
            id: features.properties.place_id,
            name :features.properties.display_name,
            longitude: features.geometry.coordinates[0],
            latitude: features.geometry.coordinates[1],
        }
    })
    return searchData;
}
