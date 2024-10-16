import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles, editArticle, deleteArticle } from "../../redux-slices/articlesSlice";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom"

export default function ArticlesAll() {
    const dispatch = useDispatch();
    const { data: articles, status } = useSelector((state) => state.articles);
    const [editMode, setEditMode] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        category: ""
    });
    const { state } = useContext(AuthContext);
    const [sortCategory, setSortCategory] = useState(""); // State for sorting

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchArticles());
        }
    }, [dispatch, status]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = (article) => {
        setEditMode(article._id);
        setFormData({
            title: article.title,
            body: article.body,
            category: article.category
        });
        setSelectedFile(null); // Reset file on edit start
    };

    const handleUpdate = async (articleId) => {
        const articleData = new FormData(); // Use FormData to handle file upload
        articleData.append("title", formData.title);
        articleData.append("body", formData.body);
        articleData.append("category", formData.category);
        if (selectedFile) {
            articleData.append("file", selectedFile); // Append file if it exists
        }

        const resultAction = await dispatch(editArticle({ id: articleId, formData: articleData }));
        if (editArticle.fulfilled.match(resultAction)) {
            toast("Article updated successfully", { autoClose: 1000 });
            setEditMode(null);
            setFormData({ title: "", body: "", category: "" });
            setSelectedFile(null); // Reset file input

            // Refetch articles to ensure the latest data
            dispatch(fetchArticles());
        } else {
            toast.error("Failed to update article");
        }
    };

    const handleDelete = async (articleId) => {
        if (articleId) {
            await dispatch(deleteArticle(articleId));
            toast("Article deleted successfully", { autoClose: 1000 });
            dispatch(fetchArticles()); // Refetch articles after deletion
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            handleUpdate(editMode); // Pass the article ID to update
        }
    };

    const handleSortChange = (e) => {
        setSortCategory(e.target.value);
    };

    // Filter and sort articles based on selected category
    const filteredArticles = sortCategory
        ? articles.filter(article => article.category === sortCategory)
        : articles;

    return (
        <div className="container mt-4">
            <div className="mb-3">
                <label className="form-label">Sort by Category:</label>
                <select className="form-select" value={sortCategory} onChange={handleSortChange}>
                    <option value="">All Categories</option>
                    <option value="news">News</option>
                    <option value="blog">Blog</option>
                    <option value="opinion">Opinion</option>
                    <option value="research">Research</option>
                </select>
            </div>

            <div className="row">
                {filteredArticles.map((article) => (
                    <div key={article._id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                {article.file ? (
                                    <img
                                        src={`http://localhost:2002${article.file}`}
                                        alt={article.title}
                                        className="img-fluid"
                                        style={{ maxHeight: "200px", objectFit: "cover" }}
                                    />
                                ) : (
                                    <p>No image available</p>
                                )}
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">
                                    <strong>Category:</strong> {article.category}
                                </p>
                                <Link to={`/article/${article._id}`}>
                                <button className="btn btn-primary">See Detail</button>
                            </Link>

                                {/* Conditionally render buttons based on user role */}
                                {state.user && (state.user.role === "admin" || state.user.role === "moderator") && (
                                    <div className="mt-3">
                                        <button onClick={() => handleEdit(article)} className="btn btn-warning me-2">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(article._id)} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {editMode && (
                <div className="modal fade show" style={{ display: "block" }} id="editModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Article</h5>
                                    <button type="button" className="btn-close" onClick={() => setEditMode(null)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Body</label>
                                        <textarea
                                            name="body"
                                            className="form-control"
                                            value={formData.body}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Category</label>
                                        <select
                                            name="category"
                                            className="form-select"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="news">News</option>
                                            <option value="blog">Blog</option>
                                            <option value="opinion">Opinion</option>
                                            <option value="research">Research</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">File</label>
                                        <input type="file" className="form-control" onChange={handleFileChange} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setEditMode(null)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
