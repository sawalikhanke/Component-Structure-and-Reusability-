import React from "react";
import { useUser } from "../contexts/UserContext";

const Dashboard = () => {
  const { user } = useUser();

  const hours = new Date().getHours();
  const greeting =
    hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="text-center mt-5">
      <h1>{greeting}, <span className="text-danger">{user?.name}</span> 👋</h1>
      <p className="lead">Welcome to your personalized dashboard. Stay motivated 🚀</p>

      <img
        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80"
        alt="Workspace"
        className="img-fluid rounded shadow mt-4"
        style={{ maxWidth: "700px" }}
      />

      <div className="mt-5">
        <h3>✨ Stay Inspired</h3>
        <div className="d-flex justify-content-center gap-3 flex-wrap mt-3">
          <img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=500&q=80" alt="Motivation 1" className="img-fluid rounded shadow" style={{ width: "250px", height: "160px", objectFit: "cover" }}/>
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80" alt="Motivation 2" className="img-fluid rounded shadow" style={{ width: "250px", height: "160px", objectFit: "cover" }}/>
          <img src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=500&q=80" alt="Motivation 3" className="img-fluid rounded shadow" style={{ width: "250px", height: "160px", objectFit: "cover" }}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
