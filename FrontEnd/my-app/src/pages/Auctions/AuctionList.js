import { useEffect, useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import AuthContext from "../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AuctionList() {
  const [auctions, setAuctions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [timeLeft, setTimeLeft] = useState({}); 
  const [showModal, setShowModal] = useState(false);
  const { state } = useContext(AuthContext); 


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


  useEffect(()=>{
    const fetchpayment = async () => {
      try {
        const response = await axios.get(`/api/payment/get/${state.user}}`, {
          headers: { 'Authorization': localStorage.getItem('token') },
        });

        if(response.data.paymentStatus==='success'){
          setShowModal(false)
        }else {
          setShowModal(true)
        }
      } catch (err) {
        console.error('Error fetching payment:', err);
        if(state.user){
          setShowModal(true)
        }

      }
    };
    fetchpayment();
  },[state.user])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isAuctionActive = (endDate) => {
    const currentDate = new Date();
    const auctionEndDate = new Date(endDate);
    return auctionEndDate > currentDate; 
  };

  const calculateTimeLeft = (endDate) => {
    const difference = new Date(endDate) - new Date();
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return {
        days,
        hours,
        minutes,
        seconds,
      };
    } else {
      return null; 
    }
  };

  useEffect(() => {
    const updateTimers = () => {
      const newTimeLeft = {};
      auctions.forEach((auction) => {
        const timeRemaining = calculateTimeLeft(auction.endDate);
        if (timeRemaining) {
          newTimeLeft[auction._id] = timeRemaining;
        }
      });
      setTimeLeft(newTimeLeft);
    };

    updateTimers();

    const intervalId = setInterval(updateTimers, 1000); 
    return () => clearInterval(intervalId);
  }, [auctions]);


  const filteredAuctions = auctions.filter(auction => auction.approved && isAuctionActive(auction.endDate));
  const indexOfLastAuction = currentPage * postsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - postsPerPage;
  const currentAuctions = filteredAuctions.slice(indexOfFirstAuction, indexOfLastAuction);
  const totalPages = Math.ceil(filteredAuctions.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubscribe=async()=>{
    try {
      const body = {
        amount: "299",
        user: state.user._id, 
      };

      const response = await axios.post('/api/payment/create', body, { 
        headers: { 'Authorization': localStorage.getItem('token') } 
      });

      localStorage.setItem('stripeId', response.data.id);
      window.location = response.data.url;
    
    } catch (err) {
      console.error(err);
    }
  }

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

                {timeLeft[auction._id] ? (
                  <p className="alert alert-info">
                    <strong>Time Left:</strong> {timeLeft[auction._id].days}d {timeLeft[auction._id].hours}h {timeLeft[auction._id].minutes}m {timeLeft[auction._id].seconds}s
                  </p>
                ) : (
                  <p className="card-text text-danger">Auction Ended</p>
                )}

                <Link to={`/auction/${auction._id}`} className="btn btn-primary">Show Auction</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      

      {/* Subscription */}
      {showModal && (
           <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document" style={{ backgroundColor: '#2c6a30' }}>
      <div className="modal-content" style={{ backgroundColor: '#2c6a30' }}>
        <div className="modal-body text-center">
          {/* Replace text with video */}
          <video width="100%" height="auto" autoPlay  muted>
            <source src={require('C:/Portifolio-Project/FrontEnd/my-app/src/bgImgs/subscription.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Buttons centered in the modal */}
          <div className="d-flex justify-content-center mt-4">
            <button 
              type="button" 
              className="btn mx-2" 
              onClick={() => setShowModal(false)} 
              style={{ backgroundColor: '#f04641', color: 'white' }}
            >
              Close
            </button>
            <button 
              type="button" 
              className="btn mx-2" 
              onClick={handleSubscribe} 
              style={{ backgroundColor: '#1db4e4', color: 'white' }}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}



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
