import { useState, useEffect } from "react";
import axios from '../config/axios';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css'; // Ensure to add custom CSS for search bar styling

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [propertyType, setPropertyType] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');

    const statesData = [
        { "state": "Andhra Pradesh", "districts": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"] },
        { "state": "Arunachal Pradesh", "districts": ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"] }
    ];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/property/posts');
                const approvedPosts = response.data.filter(post => post.approved);
                setPosts(approvedPosts);
                setFilteredPosts(approvedPosts);
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };
        fetchPosts();
    }, []);

    const handleSearch = () => {
        let filtered = [...posts];

        if (propertyType) {

            filtered = filtered.filter(post => 
               post.propertyType?.toLowerCase().replace(/\s+/g, '').trim() === propertyType.toLowerCase().replace(/\s+/g, '').trim()
           );
           
        }
        if (state) {
            filtered = filtered.filter(post => post.state === state);
        }
        if (district) {
            filtered = filtered.filter(post => post.city === district);
        }

        setFilteredPosts(filtered);
    };

    return (
        <div className="container my-7" style={{ paddingTop: "40px" }}>
            {/* Search Filter */}
            <div className="search-bar-container mb-4 p-3 bg-light shadow-sm rounded">
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="propertyType">Property Type:</label>
                        <select id="propertyType" className="form-control" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                            <option value="">All Types</option>
                            <option value="farmLand">Farm Land</option>
                            <option value="dairyFarm">Dairy Farm</option>
                            <option value="poultryFarm">Poultry Farm</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="state">State:</label>
                        <select id="state" className="form-control" value={state} onChange={(e) => { setState(e.target.value); setDistrict(''); }}>
                            <option value="">All States</option>
                            {statesData.map((st, index) => (
                                <option key={index} value={st.state}>{st.state}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="district">District:</label>
                        <select id="district" className="form-control" value={district} onChange={(e) => setDistrict(e.target.value)} disabled={!state}>
                            <option value="">All Districts</option>
                            {state && statesData.find(st => st.state === state)?.districts.map((dist, index) => (
                                <option key={index} value={dist}>{dist}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3 d-flex align-items-end">
                        <button className="btn btn-primary btn-block" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </div>

            {/* Property Cards */}
            <div className="row">
                {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                        <div key={index} className="col-12 mb-4">
                            <div className="card shadow-sm property-card d-flex flex-row">
                                <div className="property-img-wrapper">
                                    {post.file && (
                                        <img
                                            src={`http://localhost:2002${post.file}`}
                                            className="img-fluid"
                                            alt={post.title}
                                        />
                                    )}
                                </div>
                                <div className="property-details-wrapper flex-grow-1 p-3">
                                    <h5 className="card-title">{post.propertyType}</h5>
                                    <p className="card-text mb-1"><strong>Location:</strong> {post.city}, {post.locality}</p>
                                    <p className="card-text mb-1"><strong>Area:</strong> {post.area} {post.unitMeasurement}</p>
                                    <p className="card-text mb-1"><strong>Price:</strong> ₹{post.price}</p>
                                    <Link to={`/property/${post._id}`} className="btn btn-primary btn-sm mt-auto">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No properties available</p>
                )}
            </div>
        </div>
    );
}
