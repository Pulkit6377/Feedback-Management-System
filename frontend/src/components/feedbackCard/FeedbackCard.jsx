// FeedbackCard.jsx
import React from "react";
import "./FeedbackCard.css"; // optional, for styling
import { useState } from "react";
import axios from "axios";

const FeedbackCard = ({ feedback ,onUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(feedback.comment || "");
  const [rating, setRating] = useState(feedback.rating || 0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token"); // for auth

  const handleUpdate = async (e) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.put(
        `https://feedback-management-system-4f6t.onrender.com/api/user/myfeedback/${feedback._id}`, // adjust URL
        { comment,rating },
        {
          headers: {token:token},
        }
      );

    if (response.data.success) {
        setMessage("Feedback updated successfully!");
        setIsEditing(false);
        if (onUpdated) onUpdated(feedback._id,comment,rating); // callback to update parent state
      } else {
        setMessage(response.data.message || "Failed to update feedback");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error updating feedback");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="feedback-card">
      {isEditing?(
        <>
        <textarea 
        value={comment} onChange={(e) => setComment(e.target.value)}
        />
        <input 
        type="Number" min="0" max="5" value={rating} 
        onChange={(e) => setRating(Number(e.target.value))}
        placeholder="Rating"
        />
        <button onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating...":"Save"}
        </button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ):(
        <>
          <p>{feedback.comment}</p>
          <p> {feedback.rating || 0} </p>
          <button onClick={()=> setIsEditing(true)}>Edit</button>
        </>
      )}
      {message && <p className="update-message">{message}</p>}
    </div>
  );
};

export default FeedbackCard;
