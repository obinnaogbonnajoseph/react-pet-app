import { useState, useEffect } from "react";
import client from "./client";

const localCache = {};

export default function useBreedList(animal) {
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState('unloaded');

    useEffect(() => {
        if (!animal) {
            setBreedList([]);
        } else if (localCache[animal]) {
            setBreedList(localCache[animal]);
        } else {
            requestBreedList();
        }

        async function requestBreedList() {
            setBreedList([]);
            setStatus('loading');
            const { data: { breeds } } = await client.animalData.breeds(animal);
            localCache[animal] = breeds || [];
            setBreedList(localCache[animal]);
            setStatus('loaded');
        }
    }, [animal]);

    return [breedList, status]
}