import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2'; // Import Pie chart from Chart.js
import "../../css/AllAuctions.css"; // Import your custom CSS

export default function AllAuctions() {
  const [auctions, setAuctions] = useState([]);
  const [showNotApproved, setShowNotApproved] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get("/api/auction/all", {
          headers: { 'Authorization': token }
        });
        setAuctions(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAuctions();
  }, [token]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const approveAuction = async (id) => {
    try {
      await axios.put(`/api/auction/approve/${id}`, {}, {
        headers: { 'Authorization': token }
      });
      alert('Auction approved successfully');
      setAuctions(auctions.map(auction => auction._id === id ? { ...auction, approved: true } : auction));
    } catch (error) {
      console.error("Error approving auction:", error.response ? error.response.data : error.message);
      alert('Failed to approve auction');
    }
  };

  const deleteAuction = async (id) => {
    if (window.confirm('Are you sure you want to delete this auction?')) {
      try {
        await axios.delete(`/api/auction/delete/${id}`, {
          headers: { 'Authorization': token }
        });
        alert('Auction deleted successfully');
        setAuctions(auctions.filter(auction => auction._id !== id));
      } catch (error) {
        console.error("Error deleting auction:", error.response ? error.response.data : error.message);
        alert('Failed to delete auction');
      }
    }
  };

  // Calculate counts for approved and not approved auctions
  const totalAuctions = auctions.length;
  const approvedCount = auctions.filter(auction => auction.approved).length;
  const notApprovedCount = totalAuctions - approvedCount;

  // Data for the pie chart
  const chartData = {
    labels: ['Approved', 'Not Approved'],
    datasets: [
      {
        data: [approvedCount, notApprovedCount],
        backgroundColor: ['#4caf50', '#f44336'], // Green for approved, red for not approved
        hoverBackgroundColor: ['#66bb6a', '#ef5350'], // Lighter shades on hover
      },
    ],
  };

  return (
    <div className="container mt-4">
      <div className="mb-4 text-center">
        <h2 style={{ color: 'black' }}>Auction Statistics</h2>
        <div className="stats">
          <div className="stat-item">
            <strong>Total Auctions: </strong>{totalAuctions}
          </div>
          <div className="stat-item">
            <strong>Approved Auctions: </strong>{approvedCount}
          </div>
          <div className="stat-item">
            <strong>Not Approved Auctions: </strong>{notApprovedCount}
          </div>
        </div>
      </div>

      {/* Pie Chart for Auction Approval Status */}
      <div className="mb-4 text-center">
        <Pie data={chartData} options={{ maintainAspectRatio: false }} height={250} />
      </div>

      <div className="mb-3 text-center">
        <button className="btn btn-secondary toggle-button" onClick={() => setShowNotApproved(!showNotApproved)}>
          {showNotApproved ? 'Show Approved Auctions' : 'Show Not Approved Auctions'}
        </button>
      </div>

      <div className="row">
        {auctions
          .filter(auction => (showNotApproved ? !auction.approved : auction.approved))
          .map((auction) => (
            <div key={auction._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={auction.file ? `http://localhost:2002${auction.file}` : 'placeholder-image-url'} // Replace with an actual placeholder URL if needed
                  alt={auction.title}
                  className="card-img-top"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{auction.title}</h5>
                  <p className="card-text">{auction.description}</p>
                  <p className="card-text"><strong>Category:</strong> {auction.category}</p>
                  <p className="card-text"><strong>Start Date:</strong> {formatDate(auction.startDate)}</p>
                  <p className="card-text"><strong>End Date:</strong> {formatDate(auction.endDate)}</p>
                  <p className="card-text"><strong>Starting Bid:</strong> {auction.startBid}</p>
                  <Link to={`/auction/${auction._id}`} className="btn btn-primary">Show Auction</Link><br/>

                  {!auction.approved && (
                    <button className="btn btn-success mt-2" onClick={() => approveAuction(auction._id)}>Approve Auction</button>
                  )}
                 <br/>
                  <button className="btn btn-danger mt-2" onClick={() => deleteAuction(auction._id)}>Delete Auction</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
