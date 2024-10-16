import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications

export default function ArticleDetails() {
    const { id } = useParams();
    const [article, setArticle] = useState(null); // State to hold article data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`/api/article/get/${id}`);
                setArticle(response.data); // Set the article data
            } catch (err) {
                setError("Failed to fetch article details"); // Set error if fetching fails
                toast.error("Failed to fetch article details"); // Show error notification
            } finally {
                setLoading(false); // Set loading to false once fetching is done
            }
        };

        fetchArticle(); // Call the function to fetch the article
    }, [id]); // Dependency array includes id to refetch if it changes

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div>{error}</div>; // Error state
    }

    return (
        <div className="container mt-4">
            {article ? (
                <div className="card">
                    {article.file && (
                        <img
                            src={`http://localhost:2002${article.file}`}
                            alt={article.title}
                            className="card-img-top"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                    )}
                    <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-text"><strong>Category:</strong> {article.category}</p>
                        <p className="card-text">{article.body}</p>
                    </div>
                </div>
            ) : (
                <p>Article not found.</p> 
            )}
        </div>
    );
}
