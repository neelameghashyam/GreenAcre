import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Link } from "react-router-dom";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js automatically
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function AllProperties() {
    const [posts, setPosts] = useState([]);
    const [showNotApproved, setShowNotApproved] = useState(false); // State to toggle not-approved properties view
    const token = localStorage.getItem('token');

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Number of posts per page

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/property/posts', {
                    headers: { 'Authorization': localStorage.getItem('token') }
                });
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, [token]);

    const approvePost = async (id) => {
        try {
            await axios.put(`/api/property/approve/${id}`, {}, {
                headers: { 'Authorization': localStorage.getItem('token') }
            });
            alert('Post approved successfully');
            setPosts(posts.map(post => post._id === id ? { ...post, approved: true } : post));
        } catch (error) {
            console.error("Error approving post:", error.response ? error.response.data : error.message);
            alert('Failed to approve post');
        }
    };

    const deletePost = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await axios.delete(`/api/property/post-delete/${id}`, {
                    headers: { 'Authorization': localStorage.getItem('token') }
                });
                alert('Post deleted successfully');
                setPosts(posts.filter(post => post._id !== id));
            } catch (error) {
                console.error("Error deleting post:", error.response ? error.response.data : error.message);
                alert('Failed to delete post');
            }
        }
    };

    // Pie chart data for approved vs not approved
    const approvedCount = posts.filter(post => post.approved).length;
    const notApprovedCount = posts.length - approvedCount;

    const pieData = {
        labels: ['Approved', 'Not Approved'],
        datasets: [
            {
                label: 'Property Approval Status',
                data: [approvedCount, notApprovedCount],
                backgroundColor: ['#36a2eb', '#ff6384'],
                hoverBackgroundColor: ['#36a2eb', '#ff6384'],
            },
        ],
    };

    // Pie chart options: Disable animation and tooltips
    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false, // Ensure it doesn't stretch to container size
        animation: {
            duration: 0, // Disable animation
        },
        plugins: {
            legend: {
                position: 'bottom', // Adjust legend position for smaller size
            },
        },
    };

    // Filtered list for displaying posts (based on showNotApproved toggle)
    const filteredPosts = showNotApproved ? posts.filter(post => !post.approved) : posts;

    // Pagination Logic
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4" style={{ color: 'black' }}>All Properties</h1>

            {/* Pie Chart to display Approved vs Not Approved */}
            <div className="mb-4" style={{ width: '200px', margin: '0 auto', height: '200px' }}>
                <Pie data={pieData} options={pieOptions} />
            </div>

            <div className="text-center mb-4">
                <button
                    className="btn btn-warning"
                    onClick={() => setShowNotApproved(!showNotApproved)}
                >
                    {showNotApproved ? "Show All Properties" : "Show Not Approved Properties"}
                </button>
            </div>

            <div className="row">
                {currentPosts.map(post => (
                    <div key={post._id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            {post.file && (
                                <img
                                    src={`http://localhost:2002${post.file}`}
                                    alt={post.title}
                                    className="card-img-top"
                                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{post.type}</h5>
                                <p className="card-text"><strong>Property Type:</strong> {post.propertyType}</p>
                                <p className="card-text"><strong>Location:</strong> {`${post.city}, ${post.locality}, ${post.address}`}</p>
                                <p className="card-text"><strong>Area:</strong> {`${post.area} ${post.unitMeasurement}`}</p>
                                <p className="card-text"><strong>Price:</strong> {post.price}</p>
                                <p className="card-text"><strong>Approved:</strong> {post.approved ? "Yes" : "No"}</p>
                                <p className="d-flex align-items-center">
                                   <i className="fa fa-eye me-2"></i> 
                                   <b>{post.views}</b>
                                </p>
                                <Link to={`/property/${post._id}`} className="btn btn-primary w-100">Show Property</Link>

                                {!post.approved && (
                                    <div className="mt-2">
                                        <button className="btn btn-success w-100" onClick={() => approvePost(post._id)}>Approve</button>
                                    </div>
                                )}
                                <button className="btn btn-danger w-100 mt-2" onClick={() => deletePost(post._id)}>Delete Post</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <nav>
                    <ul className="pagination justify-content-center mt-4">
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => setCurrentPage(index + 1)} className="page-link">
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}
