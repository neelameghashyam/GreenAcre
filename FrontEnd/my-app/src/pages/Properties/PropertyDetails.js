import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config/axios";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [user, setUser] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for better UX
  const [error, setError] = useState(null); // Error state for handling errors

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/property/post/${id}`);
        setProperty(response.data);
        setLoading(false); // Data is fetched successfully
      } catch (err) {
        setError('Failed to fetch property details');
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <p>Loading...</p>; // Display loading message
  if (error) return <p>{error}</p>; // Display error message if any

  if (!property) return <p>No property found</p>;

  const handleView = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`/api/user/${property.user}`, {
          headers: { Authorization: token },
        });

        setOwnerDetails(response.data);
        setUser(true); // Only set user after successful response
        await axios.put(`/api/property/views/${property._id}`);

      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error fetching owner details:", err);
    }
  };

  return (
    <div className="container my-20" style={{ paddingTop: "40px" }}>
      <div className="row">
        <div className="col-md-6">
          {property.file && (
            <img
              src={`http://localhost:2002${property.file}`}
              alt={property.title}
              className="img-fluid mb-3"
              style={{ maxHeight: "600px", objectFit: "cover", width: "100%" }}
            />
          )}
        </div>
        <div className="col-md-6">
          <h3 className="card-title">{property.title}</h3>
          <p><strong>Type:</strong> {property.type}</p>
          <p><strong>Property Type:</strong> {property.propertyType}</p>
          <p><strong>Map Location:</strong>
            <button
              className="btn btn-primary ms-2"
              onClick={() => window.open(property.mapLocation, "_blank")}
            >
              View on Map
            </button>
          </p>
          <p><strong>Description:</strong> {property.description}</p>
          <p><strong>City:</strong> {property.city}</p>
          <p><strong>Locality:</strong> {property.locality}</p>
          <p><strong>Address:</strong> {property.address}</p>
          <p><strong>Area:</strong> {property.area} {property.unitMeasurement}</p>
          <p><strong>Ownership:</strong> {property.ownerShip}</p>
          <p><strong>Price:</strong> ₹{property.price}</p>

          {user && ownerDetails ? (
            <div className="alert alert-info">
              <h5>Owner Details</h5>
              <p><strong>Name:</strong> {ownerDetails.name}</p>
              <p><strong>Email:</strong> {ownerDetails.email}</p>
              <p><strong>Phone:</strong> +91-{ownerDetails.phone}</p>
            </div>
          ) : (
            <button className="btn btn-info" onClick={handleView}>
              View Owner Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
