import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "../../config/axios";
import { toast } from 'react-toastify';
import AuthContext from "../../context/AuthContext";
import '../../css/AuctionDet.css'

export default function AuctionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [bidForm, setBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [previousBids, setPreviousBids] = useState([]);
  const [highestBid, setHighestBid] = useState(0);
  const[payment,setPayment]=useState({})
  const { state } = useContext(AuthContext); 

  // Fetch auction details on component mount
  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await axios.get(`/api/auction/get/${id}`);
        setAuction(response.data);
      } catch (err) {
        console.error('Error fetching auction:', err);
        toast.error('Error fetching auction details');
      }
    };
    fetchAuction();
  }, [id]);

  useEffect(()=>{
    const fetchpayment = async () => {
      try {
        const response = await axios.get(`/api/payment/get/${state.user}}`, {
          headers: { 'Authorization': localStorage.getItem('token') },
        });
        setPayment(response.data);
        console.log(response.data)
      } catch (err) {
        console.error('Error fetching payment:', err);
      }
    };
    fetchpayment();
  },[state.user])

  // Fetch all bids and filter out user's previous bids and the highest bid
  useEffect(() => {
    const fetchBids = async () => {
      try {
        if (state.user) { // Fetch bids only if the user is logged in
          const response = await axios.get(`/api/bidder/get-all-of-auction/${id}`, {
            headers: { 'Authorization': localStorage.getItem('token') },
          });

          const bidsForAuction = response.data;
          const highestBid = bidsForAuction.length > 0 
            ? Math.max(...bidsForAuction.map(bid => bid.bid))
            : 0;
          setHighestBid(highestBid);

          const userBids = bidsForAuction.filter(bid => bid.user === state.user._id);
          setPreviousBids(userBids);
        }
      } catch (err) {
        console.error('Error fetching previous bids:', err);
      }
    };

    fetchBids();
  }, [bidForm, id, state.user]);

  const handleView = async () => {
    try {
      if (state.user) {
        const response = await axios.get(`/api/user/${auction.user}`, {
          headers: { 'Authorization': localStorage.getItem('token') }
        });
        setOwnerDetails(response.data);
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Error fetching owner details:', err);
      toast.error('Error fetching owner details');
    }
  };

  const handleBid = async () => {
    try {
      if(payment.paymentStatus==='success'){
         setBidForm(true)
      }else{
      const body = {
        amount: "299",
        user: state.user._id, 
      };

      const response = await axios.post('/api/payment/create', body, { // Include the body in the post request
        headers: { 'Authorization': localStorage.getItem('token') } // Pass the token in the headers
      });

      localStorage.setItem('stripeId', response.data.id);
      window.location = response.data.url;
    }
    } catch (err) {
      console.error(err);
      // toast.error('Payment creation failed: ' + err.response.data.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        auction: auction._id,
        bid: bidAmount,
      };
      await axios.post('/api/bidder/create', formData, {
        headers: { 'Authorization': localStorage.getItem('token') },
      });
      toast('Successfully Bidded', { autoClose: 1000 });
      setBidAmount('');
      setBidForm(false);
    } catch (err) {
      console.error('Error submitting bid:', err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!auction) return <p>Loading...</p>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4 shadow-sm">
            <img
              src={auction.file ? `http://localhost:2002${auction.file}` : '/path/to/placeholder-image.jpg'}
              alt={auction.title}
              className="card-img-top"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{auction.title}</h5>
              <p className="card-text">{auction.description}</p>
              <p className="card-text"><strong>Category:</strong> {auction.category}</p>
              <p className="card-text"><strong>Start Date:</strong> {formatDate(auction.startDate)}</p>
              <p className="card-text"><strong>End Date:</strong> {formatDate(auction.endDate)}</p>
              <p className="card-text"><strong>Starting Bid:</strong> ₹{auction.startBid}</p>
              <p className="card-text"><strong>Current Highest Bid:</strong> ₹{highestBid || 'No bids yet'}</p>

              {ownerDetails ? (
                <div className="mt-3">
                  <h6>Owner Details:</h6>
                  <p><strong>Name:</strong> {ownerDetails.name}</p>
                  <p><strong>Email:</strong> {ownerDetails.email}</p>
                  <p><strong>Phone:</strong> +91-{ownerDetails.phone}</p>
                </div>
              ) : (
                <button className="btn btn-outline-primary" onClick={handleView}>
                  View Owner Details
                </button>
              )}

              {state.user && state.user.role !== 'admin' && state.user.role !== 'moderator' && !bidForm ? (
                <button className="btn btn-success mt-3" onClick={handleBid}>Place a Bid</button>
              ) : (
                bidForm && (
                  <form onSubmit={handleSubmit} className="mt-3">
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter bid amount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        required
                      />
                      <button className="btn btn-primary" type="submit">Submit Bid</button>
                    </div>
                  </form>
                )
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
  {state.isLoggedIn && previousBids.length > 0 && (
    <div className="card mb-4">
      <div className="card-header">
        <h4>Your Previous Bids</h4>
      </div>
      <div className="alert" role="alert">
        {previousBids.map(bid => (
          <div key={bid._id} className="alert alert-light border bid-card">
          <p><strong>Bid Amount:</strong> ₹{bid.bid}</p>
          <p><strong>Bid Date:</strong> {formatDate(bid.createdAt)}</p>
        </div>
        
        
        ))}
      </div>
    </div>
  )}

  {state.isLoggedIn && previousBids.length === 0 && (state.user.role === "user") && (
    <div className="alert alert-warning" role="alert">
      <p>No previous bids for this auction.</p>
    </div>
  )}
</div>

      </div>
    </div>
  );
}
