import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Restaurant = () => {
    const location = useLocation();
    const restaurant = location.state?.restaurant;
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (restaurant?._id) {
            fetch(`${API_URL}/restaurants/review/${restaurant._id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        setReviews(data);
                    } else {
                        setReviews([]);
                    }
                    setLoading(false);
                })

                .catch((error) => {
                    console.error('Napaka pri pridobivanju mnenj:', error);
                    setLoading(false);
                });
        }
    }, [restaurant]);

    if (!restaurant) {
        return <p className="text-red-500 p-4">Ni podatkov o restavraciji. (Poskusil si reloadati?)</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>

            <h2 className="text-2xl font-semibold mb-2">Mnenja</h2>

            {loading ? (
                <p>Nalaganje mnenj...</p>
            ) : reviews.length === 0 ? (
                <p className="text-gray-500">Ta restavracija še nima mnenj.</p>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review._id} className="border p-4 rounded shadow-sm bg-white">
                            <p className="font-medium text-gray-800">{review.comment}</p>
                            <div className="text-sm text-gray-600 mt-2">
                                Ocena: <span className="font-bold">{review.rating}/5</span>
                            </div>
                            <div className="text-xs text-gray-400">
                                Uporabnik: {review.user.name}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Restaurant;
