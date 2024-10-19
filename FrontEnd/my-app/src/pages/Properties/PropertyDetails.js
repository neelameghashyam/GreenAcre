import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

const icon = new L.Icon({
  iconUrl: require('../../bgImgs/iconLoc.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [user, setUser] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/property/post/${id}`);
        setProperty(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch property details');
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (property && property.mapLocation) {
      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
            params: {
              key: "pk.8e34b2bcaaefefbada0e712c444425e3",
              q: `${property.pincode}, ${property.city}`,
              format: 'json'
            },
          });

          if (Array.isArray(response.data) && response.data.length > 0) {
            const { lat, lon } = response.data[0]; 
            setLatitude(lat);
            setLongitude(lon);
          } else {
            setLatitude(response.data.lat);
            setLongitude(response.data.lon);
          }

        } catch (err) {
          setError('Failed to fetch coordinates');
          console.error("Error fetching coordinates:", err);
        }
      };

      fetchCoordinates();
    }
  }, [property]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!property) return <p>No property found</p>;

  const handleView = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`/api/user/${property.user}`, {
          headers: { Authorization: token },
        });

        setOwnerDetails(response.data);
        setUser(true);
        await axios.put(`/api/property/views/${property._id}`);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error fetching owner details:", err);
    }
  };

  const handleMarkerClick = () => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView([latitude, longitude], 10)
    }
  };

  return (
    <div className="container my-4" style={{ paddingTop: "40px" }}>
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
          <div className="property-details">
            <p><strong>Type:</strong> {property.type}</p>
            <p><strong>Property Type:</strong> {property.propertyType}</p>
            <p><strong>Description:</strong> {property.description}</p>
            <p><strong>City:</strong> {property.city}</p>
            <p><strong>Pincode:</strong> {property.pincode}</p>
            <p><strong>Locality:</strong> {property.locality}</p>
            <p><strong>Address:</strong> {property.address}</p>
            <p><strong>Area:</strong> {property.area} {property.unitMeasurement}</p>
            <p><strong>Ownership:</strong> {property.ownerShip}</p>
            <p><strong>Price:</strong> ₹{property.price}</p>
          </div>

          {user && ownerDetails ? (
            <div className="alert alert-info mt-3">
              <h5>Owner Details</h5>
              <p><strong>Name:</strong> {ownerDetails.name}</p>
              <p><strong>Email:</strong> {ownerDetails.email}</p>
              <p><strong>Phone:</strong> +91-{ownerDetails.phone}</p>
            </div>
          ) : (
            <button className="btn btn-info mt-3" onClick={handleView}>
              View Owner Details
            </button>
          )}
        </div>
      </div>

      <div className="map-container mt-4" style={{ height: '400px' }}>
        <MapContainer
          center={latitude && longitude ? [latitude, longitude] : [0, 0]}
          zoom={latitude && longitude ? 13 : 2}
          className="map"
          style={{ height: '100%', width: '100%' }}
          ref={mapRef} 
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {latitude && longitude && (
            <Marker position={[latitude, longitude]} icon={icon} eventHandlers={{
              click: handleMarkerClick 
            }}>
              <Popup>
                {property.city}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div className="directions-container text-center mt-4">
        <p>
          <br />
          <button
            className="btn btn-primary mt-2"
            onClick={() => window.open(property.mapLocation, "_blank")}
          >
            Get Directions
          </button>
        </p>
      </div>
    </div>
  );
}
