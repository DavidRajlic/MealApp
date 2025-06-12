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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#fff1dc]">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold mb-2 text-[#b85c38]">{user.name}</h1>
    <h2 className="text-2xl font-semibold text-[#b85c38]/70 mb-4">
      Tvoja mnenja
    </h2>
    <hr className="mb-6 border-[#b85c38]/30" />

    {loading ? (
      <p className="text-[#b85c38] italic">Nalaganje ...</p>
    ) : reviews.length === 0 ? (
      <p className="text-sm text-[#b85c38]/70 italic">
        Nisi še oddal nobenega mnenja.
      </p>
    ) : (
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="flex items-start gap-4 border border-gray-200 p-4 rounded-lg bg-[#fffaf0] shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] cursor-pointer"
          >
            {review.restaurant.image && (
              <img
                src={review.restaurant.image || "/fallback.jpg"}
                alt={review.restaurant.name}
                className="w-12 h-12 object-cover rounded-full border border-gray-300 shadow-sm"
              />
            )}
            <div className="flex flex-col justify-center gap-1">
              <p className="text-sm font-medium text-gray-800 italic">
                {review.comment}
              </p>
              <p className="text-sm text-[#b85c38]">
                Ocena <span className="text-yellow-600">⭐</span>: {review.rating}/5
              </p>
              <p className="text-xs text-gray-500">
                Restavracija: {review.restaurant?.name || "Neznano"}
              </p>
              {review.createdAt && (
                <p className="text-xs text-gray-400">
                  Objavljeno:{" "}
                  {new Date(review.createdAt).toLocaleDateString("sl-SI")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  );
};

export default Profile;
