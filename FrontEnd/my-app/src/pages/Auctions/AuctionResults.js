import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Link } from 'react-router-dom';

export default function AuctionsResults() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get("/api/auction/all");
        setAuctions(response.data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch auctions. Please try again.");
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };
    fetchAuctions();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter auctions to only show completed ones (where endDate has passed) 
  const completedAuctionsWithoutResults = auctions.filter((auction) => {
    const now = new Date();
    const endDate = new Date(auction.endDate);

    // Check if auction has ended and does not have a final bid or bidder name
    return endDate < now && (!auction.finalBid || !auction.bidderName);
  });

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center" style={{ color: 'black' }}>Completed Auctions Without Results</h2>

      {loading && <div className="text-center"><strong>Loading...</strong></div>} {/* Loading state */}
      {error && <div className="alert alert-danger">{error}</div>} {/* Error message */}

      <div className="row">
        {completedAuctionsWithoutResults.length > 0 ? (
          completedAuctionsWithoutResults.map((auction) => (
            <div key={auction._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{auction.title}</h5>
                  <p className="card-text"><strong>Description:</strong> {auction.description}</p>
                  <p className="card-text"><strong>Category:</strong> {auction.category}</p>
                  <p className="card-text"><strong>Start Date:</strong> {formatDate(auction.startDate)}</p>
                  <p className="card-text"><strong>End Date:</strong> {formatDate(auction.endDate)}</p>
                  <p className="card-text"><strong>Starting Bid:</strong> ₹{auction.startBid}</p>
                  {auction.file && (
                    <img
                      src={`http://localhost:2002${auction.file}`}
                      alt={auction.title}
                      className="img-fluid mb-2"
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  )}
                  <Link to={`/auction-calculation/${auction._id}`} className="btn btn-primary">Show Auction</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning" role="alert">
              No auctions to calculate results.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
