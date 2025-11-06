import React, { useState } from "react";
import axios from "axios";
import "./AddFeedback.css";

const AddFeedback = ({ onFeedbackAdded }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://feedback-management-system-4f6t.onrender.com/api/user/feedback",{ comment, rating },{ headers: {token: token,}});

      console.log(token);
      
      if (res.data.success) {
        setMessage("Feedback submitted successfully!");
        onFeedbackAdded(res.data.Feedback); // update list instantly
        setComment("");
        setRating(5);
      } else {
        setMessage("Failed to add feedback.");
        console.log(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-feedback">
      <h3>Add Your Feedback</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>

        <div className="rating-select">
          <label>Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>

        {message && <p className="feedback-msg">{message}</p>}
      </form>
    </div>
  );
};

export default AddFeedback;
