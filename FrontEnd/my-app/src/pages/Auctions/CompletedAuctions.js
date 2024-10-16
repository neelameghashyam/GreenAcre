import { useState, useEffect } from "react";
import axios from "../../config/axios";

export default function CompletedAuctions() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get("/api/auction/all");
        setAuctions(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAuctions();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter auctions to only show completed ones (where endDate has passed) and have both finalBid and bidderName
  const completedAuctionsWithResults = auctions.filter((auction) => {
    const now = new Date();
    const endDate = new Date(auction.endDate);

    // Check if the auction is completed and has both finalBid and bidderName
    return endDate < now && auction.finalBid && auction.bidderName;
  });

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center" style={{ color: 'black' }}>Completed Auctions</h2>
      {completedAuctionsWithResults.length > 0 ? (
        <div className="row">
          {completedAuctionsWithResults.map((auction) => (
            <div key={auction._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                {auction.file && (
                  <img
                    src={`http://localhost:2002${auction.file}`}
                    alt={auction.title}
                    className="card-img-top"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{auction.title}</h5>
                  <p className="card-text"><strong>Description:</strong> {auction.description}</p>
                  <p className="card-text"><strong>Category:</strong> {auction.category}</p>
                  <p className="card-text"><strong>Start Date:</strong> {formatDate(auction.startDate)}</p>
                  <p className="card-text"><strong>End Date:</strong> {formatDate(auction.endDate)}</p>
                  <p className="card-text"><strong>Starting Bid:</strong> ₹{auction.startBid}</p>

                  {/* Winner Section with Highlighting */}
                  <div className="bg-light border border-primary rounded p-3 mt-4">
                    <h4 className="text-primary">Auction Winner</h4>
                    <p className="card-text mb-0"><strong>Final Bid:</strong> ₹{auction.finalBid}</p>
                    <p className="card-text mb-0"><strong>Bidder Name:</strong> {auction.bidderName}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning text-center" role="alert">
          No completed auctions with results available.
        </div>
      )}
    </div>
  );
}
