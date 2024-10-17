import { useEffect, useState } from "react";
import axios from "../../config/axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function MyAuctions() {
    const [auctions, setAuctions] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editData, setEditData] = useState({
        title: "",
        description: "",
        category: "",
        startDate: "",
        endDate: "",
        startBid: ""
    });
    const [file, setFile] = useState(null); // State to manage file

    useEffect(() => {
        const fetchMyAuctions = async () => {
            try {
                const response = await axios.get("/api/auction/my-auctions", {
                    headers: { 'Authorization': localStorage.getItem('token') }
                });
                setAuctions(response.data);
            } catch (err) {
                console.error('Error fetching auctions:', err);
            }
        };
        fetchMyAuctions();
    }, [editMode]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleEdit = (auction) => {
        setEditMode(auction._id);
        setEditData({
            title: auction.title,
            description: auction.description,
            category: auction.category,
            startDate: auction.startDate.split('T')[0], // Format the date for input
            endDate: auction.endDate.split('T')[0], // Format the date for input
            startBid: auction.startBid
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Update the file state with the selected file
    };

    const handleUpdate = async (auctionId) => {
        try {
            const formData = new FormData(); // Create FormData instance to handle file and text data

            // Append form fields
            formData.append('title', editData.title);
            formData.append('description', editData.description);
            formData.append('category', editData.category);
            formData.append('startDate', editData.startDate);
            formData.append('endDate', editData.endDate);
            formData.append('startBid', editData.startBid);

            if (file) {
                formData.append('file', file); // Append the selected file if present
            }

            const response = await axios.put(`/api/auction/edit/${auctionId}`, formData, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });

            setAuctions(auctions.map(auction => auction._id === auctionId ? response.data : auction));
            setEditMode(null); // Exit edit mode after update
            setFile(null); // Reset file input after submission
        } catch (err) {
            console.error('Error updating auction:', err);
        }
    };

    const handleDelete = async (auctionId) => {
        try {
            await axios.delete(`/api/auction/delete/${auctionId}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            // Update state to remove deleted auction
            setAuctions(auctions.filter(auction => auction._id !== auctionId));
        } catch (err) {
            console.error('Error deleting auction:', err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center" style={{ color: 'black' }}>My Auctions</h2>
            {auctions.length === 0 ? (
                <div className="alert alert-info">No Auctions Posted</div> // Show this message if no auctions are found
            ) : (
                <div className="row">
                    {auctions.map(auction => (
                        <div key={auction._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <img
                                    src={auction.file ? `http://localhost:2002${auction.file}` : "https://via.placeholder.com/300"}
                                    alt={auction.title}
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    {editMode === auction._id ? (
                                        <div>
                                            <input
                                                type="text"
                                                name="title"
                                                value={editData.title}
                                                onChange={handleEditChange}
                                                placeholder="Title"
                                                className="form-control mb-2"
                                            />
                                            <textarea
                                                name="description"
                                                value={editData.description}
                                                onChange={handleEditChange}
                                                placeholder="Description"
                                                className="form-control mb-2"
                                            />
                                            <input
                                                type="text"
                                                name="category"
                                                value={editData.category}
                                                onChange={handleEditChange}
                                                placeholder="Category"
                                                className="form-control mb-2"
                                            />
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={editData.startDate}
                                                onChange={handleEditChange}
                                                className="form-control mb-2"
                                            />
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={editData.endDate}
                                                onChange={handleEditChange}
                                                className="form-control mb-2"
                                            />
                                            <input
                                                type="number"
                                                name="startBid"
                                                value={editData.startBid}
                                                onChange={handleEditChange}
                                                placeholder="Starting Bid"
                                                className="form-control mb-2"
                                            />
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                className="form-control mb-2"
                                            />
                                            <button className="btn btn-primary" onClick={() => handleUpdate(auction._id)}>Save</button>
                                            <button className="btn btn-secondary ms-2" onClick={() => setEditMode(null)}>Cancel</button>
                                        </div>
                                    ) : (
                                        <>
                                            <h5 className="card-title">{auction.title}</h5>
                                            <p className="card-text">{auction.description}</p>
                                            <p className="card-text"><strong>Category:</strong> {auction.category}</p>
                                            <p className="card-text"><strong>Start Date:</strong> {formatDate(auction.startDate)}</p>
                                            <p className="card-text"><strong>End Date:</strong> {formatDate(auction.endDate)}</p>
                                            <p className="card-text"><strong>Starting Bid:</strong> ₹{auction.startBid}</p>
                                            <div className="card-footer">
                                                <button className="btn btn-warning" onClick={() => handleEdit(auction)}>Edit</button>
                                                <button className="btn btn-danger ms-2" onClick={() => handleDelete(auction._id)}>Delete</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
