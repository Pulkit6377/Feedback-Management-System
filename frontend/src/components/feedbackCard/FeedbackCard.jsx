// FeedbackCard.jsx
import React from "react";
import "./FeedbackCard.css"; // optional, for styling

const FeedbackCard = ({ feedback }) => {
  return (
    <div className="feedback-card">
      <p className="feedback-comment">{feedback.comment}</p>
      <p className="feedback-rating">Rating: {feedback.rating}</p>
    </div>
  );
};

export default FeedbackCard;
