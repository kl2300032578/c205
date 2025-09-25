import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Owner() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // ✅ Check authentication + role
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");

    if (!isLoggedIn || role !== "OWNER") {
      navigate("/login"); // redirect if not owner
    } else {
      fetchAllOrders();
    }
  }, [navigate]);

  // ✅ Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await fetch("http://localhost:9090/orders/all", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    }
  };

  // ✅ Update order status
  const updateStatus = async (orderId, status) => {
    try {
      const response = await fetch(
        `http://localhost:9090/orders/update-status/${orderId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      if (response.ok) {
        fetchAllOrders(); // refresh after update
      }
    } catch (error) {
      console.error("❌ Error updating status:", error);
    }
  };

  return (
    <div className="dashboard-container" style={{ padding: "20px" }}>
      <h1>Owner Dashboard</h1>

      <h3>📦 All Customer Orders</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)", 
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "white",
            }}
          >
            <thead>
              <tr style={{ background: "#f2f2f2" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Order ID
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Customer Email
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Service
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Date
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Description
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Status
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr
                  key={idx}
                  style={{
                    background: idx % 2 === 0 ? "#ffffff" : "#f9f9f9", 
                  }}
                >
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {order.id}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {order.email}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {order.service}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {order.description}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #ddd",
                      color:
                        order.status === "ACCEPTED"
                          ? "green"
                          : order.status === "REJECTED"
                          ? "red"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    <button
                      onClick={() => updateStatus(order.id, "ACCEPTED")}
                      style={{
                        marginRight: "8px",
                        padding: "6px 12px",
                        background: "green",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                      }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(order.id, "REJECTED")}
                      style={{
                        padding: "6px 12px",
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Owner;
