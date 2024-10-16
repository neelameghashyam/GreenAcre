import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useParams } from "react-router-dom";

export default function AuctionResCalculation() {
  const { id } = useParams();
  const [auction, setAuction] = useState({});
  const [finalBid, setFinalBid] = useState(null);
  const [bidderName, setBidderName] = useState(""); // State to hold the bidder's name
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await axios.get(`/api/auction/get/${id}`);
        setAuction(response.data);

        // Check if auction already has a final bid greater than 0
        if (response.data.finalBid && response.data.finalBid.bid > 0) {
          const highestBid = response.data.finalBid;
          setFinalBid(highestBid); // Set the final bid state

          // Fetch the user's name based on the saved finalBid.user
          if (highestBid.user) {
            const userResponse = await axios.get(`/api/user/${highestBid.user}`, {
              headers: { Authorization: localStorage.getItem("token") },
            });
            setBidderName(userResponse.data.name); // Set bidder's name
          } else {
            setError("User ID is missing in the final bid.");
          }
        }
      } catch (err) {
        console.log(err);
        setError("Failed to fetch auction details. Please try again.");
      }
    };
    fetchAuction();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleClick = async () => {
    try {
      const bidders = await axios.get(`/api/bidder/get-all-of-auction/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      const sortedBidders = bidders.data.sort((a, b) => b.bid - a.bid); // Sort bids in descending order
      
      if (sortedBidders.length > 0) {
        const highestBid = sortedBidders[0]; // This contains the full bidder object
        setFinalBid(highestBid); // Update state with full object

        // Fetch bidder's details if user ID is available
        if (highestBid.user) {
          const userResponse = await axios.get(`/api/user/${highestBid.user}`, {
            headers: { Authorization: localStorage.getItem("token") },
          });
          
          const userName = userResponse.data.name; // Access the name from the fetched user
          setBidderName(userName); // Set the bidder's name
          
          await axios.put(
            `/api/auction/final-bid/${id}`,
            { highestBid: highestBid.bid, bidderName: userName },
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          );
        } else {
          setError("User ID is missing in the highest bid.");
        }
      } else {
        setError("No bidders available for this auction.");
      }
    } catch (err) {
      console.log(err);
      setError("Error calculating the results. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <hr />
      {error && <p className="text-danger">{error}</p>} {/* Display error message */}
      
      <div className="card mb-4">
        <div className="card-body">
          {auction.file && (
            <img
              src={`http://localhost:2002${auction.file}`}
              alt={auction.title}
              className="img-fluid mb-3"
              style={{ maxHeight: "400px", objectFit: "cover" }} // Increased image size
            />
          )}
          <h2 className="card-title display-4">{auction.title}</h2> {/* Increased title size */}
          <p className="lead"><strong>Description:</strong> {auction.description}</p> {/* Increased description size */}
          <p className="lead"><strong>Category:</strong> {auction.category}</p>
          <p className="lead"><strong>Start Date:</strong> {formatDate(auction.startDate)}</p>
          <p className="lead"><strong>End Date:</strong> {formatDate(auction.endDate)}</p>
          <p className="lead"><strong>Starting Bid:</strong> ₹{auction.startBid}</p>
        </div>
      </div>

      {/* Conditionally render the button or results */}
      {finalBid && bidderName ? (
        <div className="alert alert-success">
          <h3 className="display-5">Highest Bid</h3> {/* Increased header size */}
          <p className="lead"><strong>Bid Amount:</strong> ₹{finalBid.bid}</p> {/* Render specific properties */}
          <p className="lead"><strong>Bidder Name:</strong> {bidderName}</p> {/* Render the bidder's name */}
          <p className="lead"><strong>Paid Status:</strong> {finalBid.paid ? "Yes" : "No"}</p> {/* Show if it's paid */}
        </div>
      ) : (
        <div className="text-center">
          <button onClick={handleClick} className="btn btn-primary btn-lg btn-block">Calculate Results</button> {/* Full-width button */}
        </div>
      )}
    </div>
  );
}
