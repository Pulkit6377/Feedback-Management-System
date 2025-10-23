import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDash = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch all feedbacks
  const getAllFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user")
      console.log(user);
      
      const res = await axios.get("http://localhost:5000/api/user/feedback", {
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
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:5000/api/admin/feedback/${id}`, {
        headers: { token:token },
      });
      if (res.data.success) {
        setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
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
