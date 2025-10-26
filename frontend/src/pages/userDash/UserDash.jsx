import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserDash.css";
import FeedbackCard from "../../components/feedbackCard/FeedbackCard.jsx";
import AddFeedback from "../../components/addFeedback/AddFeedback.jsx";

const UserDash = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  //  Fetch existing feedbacks
  const getMyFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token); 

      const response = await axios.get("http://localhost:5000/api/user/myfeedback", {headers:{token: token}});
      if (response.data.success) {
        setFeedbacks(response.data.feedback);
      }
      console.log(response.data.feedback);
      } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  //  Add newly created feedback instantly
const handleFeedbackAdded = (newFeedback) => {
  if (!newFeedback) return;
  setFeedbacks((prev) => Array.isArray(prev) ? [newFeedback, ...prev] : [newFeedback]);
};


  // update submitted feedback
  const handleFeedbackUpdated = (id, newComment, newRating) => {
  setFeedbacks((prev) =>
    prev.map((fb) =>
      fb._id === id ? { ...fb, comment: newComment, rating: newRating } : fb
    )
  );
};


  useEffect(() => {
    getMyFeedbacks();
  }, []);

  return (
    <div className="user-dash">
      <h2>Welcome to Your Dashboard </h2>

      {/*  Feedback Form on top */}
      <AddFeedback onFeedbackAdded={handleFeedbackAdded} />

      <p className="dash-subtitle">Here are your submitted feedbacks</p>      

      {/* Feedback list below */}
      <div className="feedback-list">
        {feedbacks && feedbacks.length > 0 ? (
        feedbacks.map((fb) => (
        <FeedbackCard key={fb?._id} feedback={fb} onUpdated={handleFeedbackUpdated}
        />
        ))
        ) : (
      <p className="no-feedback">No feedbacks yet</p>
)}

      </div>
    </div>
  );
}



export default UserDash;

