import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDash = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch all feedbacks
  const getAllFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const res = await axios.get("https://feedback-management-system-4f6t.onrender.com/api/user/feedback", {
        headers: { token:token },
      });
      if (res.data.success) {
        setFeedbacks(res.data.feedbacks);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Delete feedback
  const handleDelete = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`https://feedback-management-system-4f6t.onrender.com/api/user/feedback/${_id}`, {
        headers: { token:token },
      });
      if (res.data.success) {
        setFeedbacks((prev) => prev.filter((fb) => fb._id !== _id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  return (
    <div className="admin-dash">
      <h2>Admin Dashboard</h2>
      <div className="feedback-list">
        {feedbacks.length > 0 ? (
          feedbacks.map((fb) => (
            <div key={fb._id} className="feedback-card">
              <p><strong>User:</strong> {fb.user?.name || "Unknown"}</p>
              <p>{fb.comment}</p>
              <p>Rating: {fb.rating}</p>
              <button onClick={() => handleDelete(fb._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No feedbacks yet</p>
        )}
      </div>
    </div>
  );
};

export default AdminDash;
