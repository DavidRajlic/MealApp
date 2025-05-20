import { useEffect, useState } from 'react';

type Restaurant = {
    _id: string;
    name: string;
    price: number;
    additional_payment: number;
    averageRating: number;
    image: string;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/restaurants`)
            .then((res) => {
                if (!res.ok) throw new Error('Napaka pri pridobivanju podatkov.');
                return res.json();
            })
            .then((data) => setRestaurants(data))
            .catch((err) => setError(err.message));
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Seznam lokalov</h2>

            {error && <p className="text-red-500">{error}</p>}

            {restaurants.length === 0 && !error && (
                <p className="text-gray-500">Ni najdenih lokalov.</p>
            )}

            <ul className="space-y-4">
                {restaurants.map((restaurant) => (
                    <li
                        key={restaurant._id}
                        className="bg-white shadow rounded-lg p-4 border border-gray-200 flex gap-4"
                    >
                        {restaurant.image != null &&  ( <img
                            src={restaurant.image || '/fallback.jpg'}
                            alt={restaurant.name}
                            className="w-32 h-32 object-cover rounded-md"
                        />)}
                       

                        <div className="flex flex-col justify-between">
                            <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                            <p className="text-gray-700">
                                Cena: <span className="font-medium">{restaurant.price} €</span>
                            </p>
                            <p className="text-gray-700">
                                Doplačilo: <span className="font-medium">{restaurant.additional_payment} €</span>
                            </p>
                            <p className="text-gray-700">
                                Ocena: <span className="font-medium">{restaurant.averageRating} ⭐</span>
                            </p>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default Restaurants;
