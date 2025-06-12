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
    user?: { name?: string };
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
                    anonymous: true,
                    user: user._id,
                }),
            });

            if (!res.ok) throw new Error('Napaka pri pošiljanju mnenja.');

            setComment('');
            setRating(5);
            fetchReviews();
        } catch (err) {
            console.error(err);
            setError('Napaka pri dodajanju mnenja.');
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
        <div className="max-w-3xl mx-auto p-4 space-y-8">
            <h1 className="text-4xl font-extrabold text-gray-900">{restaurant.name}</h1>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Dodaj mnenje</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="comment" className="block mb-1 font-medium text-gray-700">
                            Komentar
                        </label>
                        <textarea
                            id="comment"
                            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            rows={4}
                        />
                    </div>

                    <div>
                        <label htmlFor="rating" className="block mb-1 font-medium text-gray-700">
                            Ocena (1–5)
                        </label>
                        <input
                            id="rating"
                            type="number"
                            min={1}
                            max={5}
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                            className="border border-gray-300 rounded p-2 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label>

                            Objavi anonimno
                            <input
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2 rounded font-semibold transition"
                    >
                        {submitting ? 'Pošiljanje...' : 'Dodaj mnenje'}
                    </button>
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
                                    <p className="text-gray-900 font-medium mb-2">{review.comment}</p>

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
                                            className="flex items-center space-x-1 text-green-600 hover:text-green-800 font-semibold"
                                            title="Všeč mi je"
                                            type="button"
                                        >
                                            👍 <span>{upvotes}</span>
                                        </button>

                                        <button
                                            onClick={() => voteReview(review._id, 'downvote')}
                                            className="flex items-center space-x-1 text-red-600 hover:text-red-800 font-semibold"
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
    );
};

export default Restaurant;
