import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (!role) {
      alert("Please login first to see your orders.");
      window.location.href = "/login";
      return;
    }

    let url = "";
    if (role === "OWNER") {
      url = "http://localhost:9090/orders/all";
    } else {
      url = `http://localhost:9090/orders/customer?email=${userEmail}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => console.error("❌ Error fetching orders:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        📦 {localStorage.getItem("role") === "OWNER" ? "All Orders" : "My Orders"}
      </h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {orders.map((order, index) => {
            // ✅ Default to PENDING if no status
            const status = order.status && order.status.trim() !== "" ? order.status : "PENDING";

            return (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "16px",
                  width: "220px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  textAlign: "center",
                  background: "#fff",
                }}
              >
                {order.image && (
                  <img
                    src={order.image}
                    alt={order.service}
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "12px",
                    }}
                  />
                )}
                <h3>{order.service}</h3>
                <p>{order.date ? new Date(order.date).toDateString() : "N/A"}</p>
                {order.description && (
                  <p style={{ fontSize: "12px", color: "#555" }}>
                    {order.description}
                  </p>
                )}
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color:
                        status === "ACCEPTED"
                          ? "green"
                          : status === "REJECTED"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {status}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;
