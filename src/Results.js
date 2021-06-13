import Pet from "./Pet"

const Results = ({ pets, loading }) => {
    if (loading) {
        return (
            <h2>Loading...</h2>
        )
    }
    return (
        <div className="search">
            {!pets.length ? (
                <h1>No Pets Found</h1>
            ) : (
                pets.map((pet) => {
                    return (
                        <Pet
                            animal={pet.type}
                            key={pet.id}
                            name={pet.name}
                            breed={pet.breeds.primary}
                            images={pet.photos}
                            location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
                            id={pet.id}
                        />
                    );
                })
            )}
        </div>
    );
}

export default Results;