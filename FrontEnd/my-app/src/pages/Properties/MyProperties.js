import { useState, useEffect } from "react";
import axios from '../../config/axios';
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import StatesAndDistricts from "../../StatesAndDistricts.json";

export default function MyProperties() {
    const [posts, setPosts] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    
    const initialValues = {
        type: "",
        propertyType: "",
        description: "",
        city: "",
        pincode: "",
        address: "",
        area: "",
        unitMeasurement: "",
        ownerShip: "",
        price: "",
        state: ""
    };

    const formik = useFormik({
        initialValues: initialValues,
        validate: (values) => {
            let errors = {};
            if (!values.type) errors.type = "Type is required";
            if (!values.propertyType) errors.propertyType = "Property type is required";
            if (!values.description) errors.description = "Description is required";
            if (!values.city) errors.city = "City is required";
            if (!values.pincode) errors.pincode = "Pincode is required";
            if (!values.state) errors.state = "State is required";
            if (!values.ownerShip) errors.ownerShip = "Ownership is required";
            if (!values.area) errors.area = "Area is required";
            if (!values.unitMeasurement) errors.unitMeasurement = "Unit measurement is required";
            if (!values.price) errors.price = "Price is required";

            return errors;
        },
        onSubmit: (values) => {
            handleUpdate(editMode, values);
        },
    });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/property/my-properties', {
                    headers: { 'Authorization': localStorage.getItem('token') }
                });
                setPosts(response.data);
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };

        fetchPosts();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleEdit = (post) => {
        setEditMode(post._id);
        formik.setValues({
            type: post.type,
            propertyType: post.propertyType,
            description: post.description,
            city: post.city,
            pincode: post.pincode,
            address: post.address,
            area: post.area,
            unitMeasurement: post.unitMeasurement,
            ownerShip: post.ownerShip,
            price: post.price,
            state: post.state
        });
        setSelectedFile(null);
    };

    const handleUpdate = async (postId, values) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });

        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        try {
            const response = await axios.put(`/api/property/edit/${postId}`, formData, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast('Successfully Edited', { autoClose: 1000 });
            setPosts(posts.map(post => post._id === postId ? response.data : post));
            setEditMode(null);
            formik.resetForm();
        } catch (err) {
            console.error('Error updating post:', err);
            toast.error('Error updating post');
        }
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`/api/property/post-delete/${postId}`, {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            setPosts(posts.filter(post => post._id !== postId));
            toast('Post Deleted Successfully', { autoClose: 1000 });
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    const handleStateChange = (event) => {
        const selected = event.target.value;
        formik.setFieldValue("state", selected);
        formik.setFieldValue("city", "");
    };

    const handleDistrictChange = (event) => {
        const selected = event.target.value;
        formik.setFieldValue("city", selected);
    };

    const selectedStateObject = StatesAndDistricts.find(stateObj => stateObj.state === formik.values.state);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center" style={{ color: 'black' }}>My Properties</h2>
            {Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="border rounded p-3 mb-4">
                        {editMode === post._id ? (
                            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                <h5>Edit Property</h5>
                                <div className="mb-3">
                                    <label className="form-label">Type</label>
                                    <select
                                        name="type"
                                        className="form-select"
                                        value={formik.values.type}
                                        onChange={formik.handleChange}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="sale">For Sale</option>
                                        <option value="rent">For Rent</option>
                                        <option value="lease">For Lease</option>
                                    </select>
                                    {formik.errors.type && <div className="text-danger">{formik.errors.type}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}>Property Type</label>
                                    <select
                                        name="propertyType"
                                        className="form-select"
                                        value={formik.values.propertyType}
                                        onChange={formik.handleChange}
                                    >
                                        <option value="">Select Property Type</option>
                                        <option value="Farm Land">Farm Land</option>
                                        <option value="Dairy Farm">Dairy Farm</option>
                                        <option value="Poultry Farm">Poultry Farm</option>
                                        <option value="Agri Industrial">Agri Industrial</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {formik.errors.propertyType && <div className="text-danger">{formik.errors.propertyType}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}>Description</label>
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.description && <div className="text-danger">{formik.errors.description}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}>State</label>
                                    <select
                                        name="state"
                                        className="form-select"
                                        value={formik.values.state}
                                        onChange={handleStateChange}
                                    >
                                        <option value="">Select State</option>
                                        {StatesAndDistricts.map(stateObj => (
                                            <option key={stateObj.state} value={stateObj.state}>{stateObj.state}</option>
                                        ))}
                                    </select>
                                    {formik.errors.state && <div className="text-danger">{formik.errors.state}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}>District</label>
                                    <select
                                        name="city"
                                        className="form-select"
                                        value={formik.values.city}
                                        onChange={handleDistrictChange}
                                    >
                                        <option value="">Select District</option>
                                        {selectedStateObject?.districts.map(district => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    {formik.errors.city && <div className="text-danger">{formik.errors.city}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}>Pincode</label>
                                    <input
                                        type="number"
                                        name="pincode"
                                        className="form-control"
                                        value={formik.values.pincode}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.pincode && <div className="text-danger">{formik.errors.pincode}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.address && <div className="text-danger">{formik.errors.address}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}>Area</label>
                                    <input
                                        type="number"
                                        name="area"
                                        className="form-control"
                                        value={formik.values.area}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.area && <div className="text-danger">{formik.errors.area}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}>Unit of Measurement</label>
                                    <input
                                        type="text"
                                        name="unitMeasurement"
                                        className="form-control"
                                        value={formik.values.unitMeasurement}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.unitMeasurement && <div className="text-danger">{formik.errors.unitMeasurement}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}>Ownership</label>
                                    <select
                                        name="ownerShip"
                                        className="form-select"
                                        value={formik.values.ownerShip}
                                        onChange={formik.handleChange}
                                    >
                                        <option value="">Select Ownership</option>
                                        <option value="Owner">Owner</option>
                                        <option value="Renter">Renter</option>
                                    </select>
                                    {formik.errors.ownerShip && <div className="text-danger">{formik.errors.ownerShip}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" style={{ color: 'black' }}>Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.price && <div className="text-danger">{formik.errors.price}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control" onChange={handleFileChange} />
                                </div>

                                <button type="submit" className="btn btn-primary">Update</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setEditMode(null)}>Cancel</button>
                            </form>
                        ) : (
                            <div>
                                 <div className="property-img-wrapper">
                                 {post.file && (
                                    <img
                                          src={`http://localhost:2002${post.file}`}
                                          className="img-fluid"
                                          alt={post.title}
                                             />
                                        )}
                                    </div>
                                <h5>{post.propertyType}</h5>
                                <p>{post.description}</p>
                                <p><strong>Location:</strong> {post.city}, {post.state}</p>
                                <p><strong>Pincode:</strong> {post.pincode}</p>
                                <p><strong>Price:</strong> {post.price}</p>
                                <button className="btn btn-info" onClick={() => handleEdit(post)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(post._id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No properties found.</p>
            )}
        </div>
    );
}
