import { useContext, useState, useEffect } from "react";
import AuthContext from '../../context/AuthContext';
import axios from "../../config/axios";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import StatesAndDistricts from "../../StatesAndDistricts.json";
import { MapContainer, TileLayer, Marker, Popup,useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet
import iconLoc from '../../bgImgs/iconLoc.png'
import debounce from 'lodash.debounce'

export default function Property() {
    const { handlePropertyCreation } = useContext(AuthContext);
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [mapLocation, setMapLocation] = useState([15.961329081596647, 75.9375]); 
    const [pincode, setPincode] = useState('');

    const [position, setPosition] = useState(null)
    const [draggable, setDraggable] = useState(true)

    const customIcon = new L.Icon({
        iconUrl: iconLoc, 
        iconSize: [32, 32], 
        iconAnchor: [16, 32], 
        popupAnchor: [0, -32] 
    });

    const fetchCoordinates = debounce(async () => {
        try {
            const response = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
                params: {
                    key: process.env.LOCATIO_IQ_KEY,
                    q: `${pincode}, ${selectedDistrict}`,
                    format: 'json'
                }
            });
    
            if (Array.isArray(response.data) && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                const loc = [parseFloat(lat), parseFloat(lon)];
                setPosition(loc);

            }
        } catch (err) {
            console.error("Error fetching coordinates:", err);
        }
    }, 1000); 
    
    
    useEffect(() => {
        if (pincode && selectedDistrict) {
            fetchCoordinates();
        }
    }, [pincode]);
    
    const toggleDraggable = () => {
        setDraggable(!draggable);
    };

    const updatePosition = (event) => {
        const marker = event.target;
        setPosition(marker.getLatLng());
        setMapLocation([marker.getLatLng().lat, marker.getLatLng().lng]); // Update mapLocation for the form 
    };
    const ZoomToMarker = ({ position }) => {
        const map = useMap();

        useEffect(() => {
            if (position) {
                map.setView(position, 10); 
            }
        }, [map, position]);

        return null;
    };

    const handleMarkerClick = () => {
        setPosition(mapLocation);
    };

    const [formValues, setFormValues] = useState({
        type: "",
        propertyType: "",
        description: "",
        state: "",
        city: "",
        address: "",
        area: "",
        unitMeasurement: "",
        ownerShip: "",
        price: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleStateChange = (event) => {
        const selected = event.target.value;
        setSelectedState(selected);
        setSelectedDistrict("");
        setFormValues({ ...formValues, state: selected, city: "" });
    };

    const handleDistrictChange = (event) => {
        const selected = event.target.value;
        setSelectedDistrict(selected);
        setFormValues({ ...formValues, city: selected });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formValues.type) tempErrors.type = "Type is required";
        if (!formValues.propertyType) tempErrors.propertyType = "Property type is required";
        if (!formValues.state) tempErrors.state = "State is required";
        if (!formValues.city) tempErrors.city = "City is required";
        if (!formValues.ownerShip) tempErrors.ownerShip = "Ownership is required";
        if (!formValues.description) tempErrors.description = "Description is required";
        if (!formValues.area) tempErrors.area = "Area is required";
        if (!formValues.unitMeasurement) tempErrors.unitMeasurement = "Unit measurement is required";
        if (!formValues.price) tempErrors.price = "Price is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            const formData = new FormData();
            for (const key in formValues) {
                formData.append(key, formValues[key]);
            }

            if (selectedFile) {
                formData.append("file", selectedFile);
            }

            if (mapLocation) {
                formData.append("mapLocation", mapLocation);
            }

            if (pincode) {
                formData.append("pincode", pincode);
            }

            handlePropertyCreation(formData);
        }
    };

    const selectedStateObject = StatesAndDistricts.find(stateObj => stateObj.state === selectedState);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Property Listing</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Form Fields */}
                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Type</label>
                    <select
                        name="type"
                        className="form-select"
                        value={formValues.type}
                        onChange={handleChange}
                    >
                        <option value="">Select Type</option>
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                        <option value="lease">For Lease</option>
                    </select>
                    {errors.type && <div className="text-danger">{errors.type}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Property Type</label>
                    <select
                        name="propertyType"
                        className="form-select"
                        value={formValues.propertyType}
                        onChange={handleChange}
                    >
                        <option value="">Select Property Type</option>
                        <option value="Farm Land">Farm Land</option>
                        <option value="Dairy Farm">Dairy Farm</option>
                        <option value="Poultry Farm">Poultry Farm</option>
                        <option value="Agri Industrial">Agri Industrial</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.propertyType && <div className="text-danger">{errors.propertyType}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>State</label>
                    <select
                        name="state"
                        className="form-select"
                        value={selectedState}
                        onChange={handleStateChange}
                    >
                        <option value="">Select State</option>
                        {StatesAndDistricts.map(stateObj => (
                            <option key={stateObj.state} value={stateObj.state}>{stateObj.state}</option>
                        ))}
                    </select>
                    {errors.state && <div className="text-danger">{errors.state}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>City (District)</label>
                    <select
                        name="city"
                        className="form-select"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        disabled={!selectedState}
                    >
                        <option value="">Select City</option>
                        {selectedStateObject && selectedStateObject.districts.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                    {errors.city && <div className="text-danger">{errors.city}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Pincode</label>
                    <input
                        type="number"
                        name="pincode"
                        className="form-control"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Ownership</label>
                    <select
                        name="ownerShip"
                        className="form-select"
                        value={formValues.ownerShip}
                        onChange={handleChange}
                    >
                        <option value="">Select Ownership</option>
                        <option value="owned">Owned</option>
                        <option value="leased">Leased</option>
                    </select>
                    {errors.ownerShip && <div className="text-danger">{errors.ownerShip}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formValues.description}
                        onChange={handleChange}
                    />
                    {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>

                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}> Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={formValues.address}
                                        onChange={handleChange}
                                    />
                                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Area</label>
                    <input
                        type="number"
                        name="area"
                        className="form-control"
                        value={formValues.area}
                        onChange={handleChange}
                    />
                    {errors.area && <div className="text-danger">{errors.area}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Unit Measurement</label>
                    <select
                        name="unitMeasurement"
                        className="form-select"
                        value={formValues.unitMeasurement}
                        onChange={handleChange}
                    >
                        <option value="">Select Unit Measurement</option>
                        <option value="sq ft">Square Feet</option>
                        <option value="acres">Acres</option>
                        <option value="hectares">Hectares</option>
                        <option value="sq meters">Square Meters</option>
                    </select>
                    {errors.unitMeasurement && <div className="text-danger">{errors.unitMeasurement}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={formValues.price}
                        onChange={handleChange}
                    />
                    {errors.price && <div className="text-danger">{errors.price}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Upload Image</label>
                    <input type="file" className="form-control" onChange={handleFileChange} />
                </div>

                {/* Map Section */}
                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}> Set property Location</label>
                    <div style={{ height: '300px' }}>
                        <MapContainer center={mapLocation} zoom={4} style={{ height: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {position && (
                                <Marker
                                    position={position}
                                    icon={customIcon} 
                                    draggable={draggable}
                                    eventHandlers={{
                                        dragend: updatePosition,
                                        click: handleMarkerClick, // Handle marker click to zoom the location
                                    }}
                                >
                                    <Popup minWidth={90}>
                                        <span onClick={toggleDraggable}>
                                            {draggable ? 'Drag the marker to set the location' : 'Marker fixed'}
                                        </span>
                                    </Popup>
                                </Marker>
                            )}
                            {position && <ZoomToMarker position={position} />} 
                        </MapContainer>
                    </div>
                </div><br/>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
