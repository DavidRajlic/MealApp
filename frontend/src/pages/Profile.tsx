import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isLoggedIn, token } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || !user?._id) {
      navigate("/login");
      return;
    }

    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_URL}/users/review/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Napaka pri pridobivanju mnenj");

        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Napaka:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [isLoggedIn, user, token, API_URL, navigate]);

  if (!user) return <p>Ni podatkov o uporabniku.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{user.name}</h1>
      

      <h2 className="text-2xl font-semibold mb-2">Tvoja mnenja</h2>

      {loading ? (
        <p>Nalaganje ...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">Nisi še oddal nobenega mnenja.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded bg-[#fffaf0] shadow-sm">
                {review.restaurant.image  != null && (<img
                            src={review.restaurant.image || '/fallback.jpg'}
                            alt={review.restaurant.name}
                            className="w-10 h-10 object-cover rounded-md"
                        />)}
              <p className="font-medium">{review.comment}</p>
              <p className="text-sm text-gray-600">Ocena⭐: {review.rating}/5</p>
              <p className="text-xs text-gray-500">Restavracija: {review.restaurant?.name || 'Neznano'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
