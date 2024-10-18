import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AuctionList() {
  const [auctions, setAuctions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

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
    return auctionEndDate > currentDate; 
  };

  // Pagination Logic
  const filteredAuctions = auctions.filter(auction => auction.approved && isAuctionActive(auction.endDate));
  const indexOfLastAuction = currentPage * postsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - postsPerPage;
  const currentAuctions = filteredAuctions.slice(indexOfFirstAuction, indexOfLastAuction);

  const totalPages = Math.ceil(filteredAuctions.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center" style={{ color: 'black' }}>Active Auctions</h2>
      <div className="row">
        {currentAuctions.map(auction => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center mt-4">
            {[...Array(totalPages).keys()].map((page) => (
              <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(page + 1)} className="page-link">
                  {page + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
