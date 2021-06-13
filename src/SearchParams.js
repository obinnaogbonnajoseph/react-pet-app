import { useContext, useEffect, useState } from "react";
import Results from "./Results";
import Paginator from "./Paginator";
import useBreedList from "./useBreedList";
import ThemeContext from './ThemeContext';
import client from "./client";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];


const SearchParams = () => {
    const [theme, setTheme] = useContext(ThemeContext);
    const [animal, updateAnimal] = useState();
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);
    const [location, updateLocation] = useState();
    const [breed, updateBreed] = useState();
    const [pets, setPets] = useState([]);
    const [breeds] = useBreedList(animal);

    useEffect(() => {
        requestPets();
    }, [])

    async function requestPets() {
        setLoading(true);
        const data = processData();
        const { data: { animals, pagination } } = await client.animal.search(data);
        const hasNextPage = pagination.current_page < pagination.total_pages
        setPets(animals);
        setHasNext(hasNextPage);
        setLoading(false);
    }

    const handlePageChange = async (newPage) => {
        setPage(newPage);
        await requestPets();
    }

    function processData() {
        let outputData = {};
        const data = {
            type: animal,
            breed,
            page,
            limit: 20
        };
        console.log('**** data to be processed ****', data);
        for (let key in data) {
            if (data[key] !== undefined && data[key] !== null) {
                outputData[key] = data[key]
            }
        }
        return outputData;
    }

    return (
        <div className="search-params">
            <form onSubmit={e => {
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location">
                    location
                    <input id="location"
                        onChange={(e) => updateLocation(e.target.value)}
                        value={location} placeholder="Location" />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => updateAnimal(e.target.value)}
                        onBlur={(e) => updateAnimal(e.target.value)}>
                        <option />
                        {ANIMALS.map((animal) => (
                            <option key={animal} value={animal}>
                                {animal}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        disabled={!breeds.length}
                        id="breed"
                        value={breed}
                        onChange={(e) => updateBreed(e.target.value)}
                        onBlur={(e) => updateBreed(e.target.value)}>
                        <option />
                        {breeds.map((breed) => (
                            <option key={breed.name} value={breed.name}>
                                {breed.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="theme">
                    Theme
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        onBlur={(e) => setTheme(e.target.value)}
                    >
                        <option value="peru">Peru</option>
                        <option value="darkblue">Dark Blue</option>
                        <option value="chartreuse">Chartreuse</option>
                        <option value="mediumorchid">Medium Orchid</option>
                    </select>
                </label>
                <button style={{ backgroundColor: theme }}>Submit</button>;
            </form>
            <Results pets={pets} loading={loading} />
            <Paginator page={page} hasNext={hasNext} handlePageChange={handlePageChange} />
        </div>
    );
};

export default SearchParams;