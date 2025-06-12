import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

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
        <div className="bg-[#fff5e1] min-h-screen">
            {/* Top banner */}
            <img
                src="/images/table.jpg" 
                className="w-full h-[280px] object-cover object-center rounded-none"
            />
            <div className="max-w-5xl mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6 text-[#b85c38]">Seznam lokalov</h2>

                {error && <p className="text-red-500">{error}</p>}

                {restaurants.length === 0 && !error && (
                    <p className="text-gray-600">Ni najdenih lokalov.</p>
                )}

                <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurants.map((restaurant, index) => (
                        <li
                            key={restaurant._id}
                            className="bg-white shadow-md rounded-xl p-4 border border-gray-100 flex flex-col gap-3 cursor-pointer 
                                       transition duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl animate-fadeIn"
                            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                            onClick={() => navigate(`/restaurant/${restaurant._id}`, {
                                state: { restaurant }
                            })}
                        >
                            {restaurant.image && (
                                <img
                                    src={restaurant.image || '/fallback.jpg'}
                                    alt={restaurant.name}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                            )}
                            <div className="flex flex-col gap-1">
                                <h3 className="text-xl font-bold text-[#b85c38]">{restaurant.name}</h3>
                                <p className="text-gray-700">Cena: <span className="font-semibold">{restaurant.price} €</span></p>
                                <p className="text-gray-700">Doplačilo: <span className="font-semibold">{restaurant.additional_payment} €</span></p>
                                <p className="text-gray-700">Ocena: <span className="font-semibold">{restaurant.averageRating} ⭐</span></p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Restaurants;
