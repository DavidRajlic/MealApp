import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useAuth} from '../contexts/AuthContext.ts'
import { useNavigate } from 'react-router-dom';

const Restaurant = () => {
  const location = useLocation();
  const restaurant = location.state?.restaurant;
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const { isLoggedIn, user} = useAuth();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Novo: za obrazec
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
    if (!isLoggedIn) {
        navigate(`/login`);
        return 0;
    }
    e.preventDefault();

    if (!comment || !rating) return;

    setSubmitting(true);

    try {
      const res = await fetch(`http://localhost:4000/reviews`, {
        method: 'POST',
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurant: restaurant._id,
          comment,
          rating,
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

  if (!restaurant) {
    return <p className="text-red-500 p-4">Ni podatkov o restavraciji. (Poskusil si reloadati?)</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">{restaurant.name}</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Dodaj mnenje</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Komentar</label>
            <textarea
              className="w-full border rounded p-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Ocena (1–5)</label>
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="border rounded p-2 w-20"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {submitting ? 'Pošiljanje...' : 'Dodaj mnenje'}
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Mnenja</h2>

        {loading ? (
          <p>Nalaganje mnenj...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
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
                    <img src={`${API_URL}/${review.images}`} alt="review image" />
                    Uporabnik: {review.user?.name || 'neznano'}
                </div>
                
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Restaurant;
