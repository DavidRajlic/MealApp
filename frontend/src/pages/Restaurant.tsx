import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.ts';
import { useNavigate } from 'react-router-dom';

interface Vote {
    user: string;
    value: number;
}

interface Review {
    _id: string;
    comment: string;
    rating: number;
    user?: { name?: string, _id?: string };
    images?: string;
    anonymous: boolean;
    votes?: Vote[];
}

const Restaurant = () => {
    const location = useLocation();
    const restaurant = location.state?.restaurant;
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAnonymous, setIsAnonymous] = useState(false);

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);


    const fetchReviews = () => {
        setLoading(true);
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
                setError('Napaka pri pridobivanju mnenj.');
                setLoading(false);
            });
    };

    useEffect(() => {
        if (restaurant?._id) {
            fetchReviews();
        }
    }, [restaurant]);




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoggedIn) {
            navigate(`/login`);
            return;
        }

        if (!comment || !rating) return;



        setSubmitting(true);

        try {
            const res = await fetch(`${API_URL}/reviews`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restaurant: restaurant._id,
                    comment,
                    rating,
                    anonymous: isAnonymous,
                    user: user._id,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Napaka pri pošiljanju mnenja.');
            }

            setComment('');
            setRating(5);
            fetchReviews();
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };


    const countVotes = (votes?: Vote[]) => {
        let upvotes = 0;
        let downvotes = 0;

        if (!votes) return { upvotes, downvotes };

        for (const vote of votes) {
            if (vote.value === 1) upvotes++;
            else if (vote.value === -1) downvotes++;
        }

        return { upvotes, downvotes };
    };

    const handleDelete = async (reviewId: string) => {
        if (!window.confirm("Ali res želite izbrisati to mnenje?")) return;

        try {
            const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (!res.ok) throw new Error("Napaka pri brisanju mnenja.");

            // Po uspešnem brisanju osvežimo mnenja
            fetchReviews();
        } catch (err) {
            console.error(err);
            alert("Napaka pri brisanju mnenja.");
        }
    };




    const voteReview = async (reviewId: string, type: 'upvote' | 'downvote') => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        const voteValue = type === 'upvote' ? 1 : -1;

        try {
            const res = await fetch(`${API_URL}/reviews/${reviewId}/vote`, {
                method: 'PATCH',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: voteValue }),
            });

            if (!res.ok) throw new Error('Napaka pri glasovanju.');

            fetchReviews();
        } catch (err) {
            console.error(err);
            setError('Napaka pri glasovanju.');
        }
    };

    if (!restaurant) {
        return <p className="text-red-500 p-4">Ni podatkov o restavraciji. (Poskusil si reloadati?)</p>;
    }

    return (
        <div className="min-h-screen bg-[#fef4e6]">
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white shadow rounded-xl p-6 mb-8 border border-orange-100">
                    <h1 className="text-4xl font-bold text-[#b3542d] mb-2">{restaurant.name}</h1>
                </div>

                <section className="bg-white border border-orange-100 rounded-2xl shadow-xl p-8 mb-10">
                    <h2 className="text-3xl font-bold text-[#b3542d] mb-6">Dodaj mnenje</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Komentar */}
                        <div className="mb-8">
                            <label htmlFor="comment" className="block text-xl font-bold text-[#b3542d] mb-3">
                                💬 Komentar
                            </label>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                rows={6}
                                placeholder="Napišite svoje mnenje..."
                                className="w-full text-base px-5 py-4 border-2 border-orange-200 rounded-2xl shadow-md focus:ring-2 focus:ring-orange-300 focus:outline-none placeholder:text-gray-400 transition-all"
                            />
                        </div>

                        {/* Ocena (1–5) */}
                        <div className="mb-8">
                            <label htmlFor="rating" className="block text-xl font-bold text-[#b3542d] mb-3">
                                ⭐ Ocena
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    id="rating"
                                    type="number"
                                    min={1}
                                    max={5}
                                    value={rating}
                                    onChange={(e) => setRating(parseInt(e.target.value))}
                                    required
                                    className="w-24 text-lg text-center px-5 py-3 border-2 border-orange-200 rounded-2xl shadow-md focus:ring-2 focus:ring-orange-300 focus:outline-none font-semibold text-gray-800"
                                />
                                <span className="text-base text-gray-500">(1 - 5)</span>
                            </div>
                        </div>

                        {/* Anonimno */}
                        <div className="mb-8">
                            <label className="inline-flex items-center text-lg text-gray-800 font-medium cursor-pointer">

                                Objavi anonimno
                                <input
                                    type="checkbox"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                    className="form-checkbox h-5 w-5 text-[#b3542d] border-gray-300 rounded focus:ring-2 focus:ring-orange-300 ml-2"
                                />
                            </label>
                        </div>
                        {/* Gumb */}
                        <div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-[#b3542d] hover:bg-[#993f23] text-white font-semibold px-6 py-3 rounded-xl transition disabled:bg-orange-300"
                            >
                                {submitting ? 'Pošiljanje...' : 'Dodaj mnenje'}
                            </button>
                        </div>
                    </form>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Mnenja</h2>

                    {loading ? (
                        <p>...nalaganje mnenj</p>
                    ) : error ? (
                        <p className="text-red-600">{error}</p>
                    ) : reviews.length === 0 ? (
                        <p className="text-gray-600">Ta restavracija še nima mnenj.</p>
                    ) : (
                        <div className="space-y-6">
                            {reviews.map((review) => {
                                const { upvotes, downvotes } = countVotes(review.votes);

                                return (
                                    <article
                                        key={review._id}
                                        className="border border-gray-200 rounded shadow p-4 bg-white"
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className="text-gray-900 font-medium">{review.comment}</span>

                                            {(user?._id === review.user?._id || user?.role == "admin")  && (
                                                <button
                                                    onClick={() => handleDelete(review._id)}
                                                    className="text-red-500 hover:text-red-700 text-2xl font-bold cursor-pointer"
                                                    title="Izbriši mnenje"
                                                    type="button"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-2 mb-3">
                                            <span className="font-semibold text-yellow-500">
                                                {'★'.repeat(review.rating)}{' '}
                                                <span className="text-gray-400">{'☆'.repeat(5 - review.rating)}</span>
                                            </span>

                                            <span className="text-sm text-gray-600 ml-auto">
                                                Uporabnik: <span className="font-semibold">{review.anonymous ? 'Anonimno' : review.user?.name}</span>
                                            </span>
                                        </div>

                                        {review.images != "" && (
                                            <img
                                                src={`${API_URL}/${review.images}`}
                                                alt="slika mnenja"
                                                className="max-w-full max-h-64 object-cover rounded mb-3"
                                            />
                                        )}

                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => voteReview(review._id, 'upvote')}
                                                className="flex items-center space-x-1 text-green-600 hover:text-green-800 font-semibold cursor-pointer"
                                                title="Všeč mi je"
                                                type="button"
                                            >
                                                👍 <span>{upvotes}</span>
                                            </button>

                                            <button
                                                onClick={() => voteReview(review._id, 'downvote')}
                                                className="flex items-center space-x-1 text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                                                title="Ni mi všeč"
                                                type="button"
                                            >
                                                👎 <span>{downvotes}</span>
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Restaurant;
