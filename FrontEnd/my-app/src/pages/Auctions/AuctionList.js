import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';

export default function AuctionList() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get('/api/auction/all');
        setAuctions(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAuctions();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isAuctionActive = (endDate) => {
    const currentDate = new Date();
    const auctionEndDate = new Date(endDate);
    return auctionEndDate > currentDate; // Return true if auction is still active
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center" style={{ color: 'black' }}>Active Auctions</h2>
      <div className="row">
        {auctions
          .filter(auction => auction.approved && isAuctionActive(auction.endDate)) // Filter for approved and active auctions
          .map(auction => (
            <div className="col-md-4 mb-4" key={auction._id}>
              <div className="card shadow-sm">
                {auction.file && (
                  <img
                    src={`http://localhost:2002${auction.file}`}
                    alt={auction.title}
                    className="card-img-top"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{auction.title}</h5>
                  <p className="card-text">{auction.description}</p>
                  <p className="card-text"><strong>Category:</strong> {auction.category}</p>
                  <p className="card-text"><strong>Start Date:</strong> {formatDate(auction.startDate)}</p>
                  <p className="card-text"><strong>End Date:</strong> {formatDate(auction.endDate)}</p>
                  <p className="card-text"><strong>Starting Bid:</strong> ₹{auction.startBid}</p>
                  <Link to={`/auction/${auction._id}`} className="btn btn-primary">Show Auction</Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
