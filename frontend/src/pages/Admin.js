import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Admin() {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Login required");
      return;
    }

    const decoded = JSON.parse(atob(token.split(".")[1]));

    if (decoded.role !== "admin") {
        alert("Admin access only");
        navigate("/");
        return;
    }

    axios
      .get("http://localhost:5000/api/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        alert("Not authorized or error fetching requests");
        console.log(err);
      });
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/requests/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI immediately
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status } : req
        )
      );
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
  <div style={{ padding: "30px", backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
    <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
      Admin Dashboard
    </h1>

    {requests.length === 0 && (
      <p style={{ textAlign: "center" }}>No requests found</p>
    )}

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "20px",
      }}
    >
      {requests.map((req) => (
        <div
          key={req._id}
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <p><b>User:</b> {req.user?.name}</p>
          <p><b>Email:</b> {req.user?.email}</p>
          <p><b>Product:</b> {req.product?.name}</p>
          <p><b>Type:</b> {req.type}</p>

          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "14px",
                backgroundColor:
                  req.status === "pending"
                    ? "#ffeeba"
                    : req.status === "contacted"
                    ? "#bee5eb"
                    : "#c3e6cb",
                color: "#333",
              }}
            >
              {req.status}
            </span>
          </p>

          <div style={{ marginTop: "15px" }}>
            <button
              onClick={() => updateStatus(req._id, "contacted")}
              style={{ marginRight: "10px" }}
            >
              Mark Contacted
            </button>

            <button
              onClick={() => updateStatus(req._id, "completed")}
            >
              Mark Completed
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default Admin;
