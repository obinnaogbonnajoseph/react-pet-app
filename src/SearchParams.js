import { useContext, useEffect, useState } from "react";
import Results from "./Results";
import Paginator from "./Paginator";
import useBreedList from "./useBreedList";
import ThemeContext from './ThemeContext';

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [theme, setTheme] = useContext(ThemeContext);
    const [animal, updateAnimal] = useState('');
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const [location, updateLocation] = useState('');
    const [breed, updateBreed] = useState('');
    const [pets, setPets] = useState([]);
    const [breeds] = useBreedList(animal);

    useEffect(() => {
        requestPets(page);
    }, [])

    async function requestPets(page) {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}&page=${page}`
        );
        const json = await res.json();

        setPets(json.pets);
        setHasNext(json.hasNext);
    }

    const handlePageChange = async (newPage) => {
        setPage(newPage);
        await requestPets(newPage);
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
                            <option key={breed} value={breed}>
                                {breed}
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
            <Results pets={pets} />
            <Paginator page={page} hasNext={hasNext} handlePageChange={handlePageChange} />
        </div>
    );
};

export default SearchParams;