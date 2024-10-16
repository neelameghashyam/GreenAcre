import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createArticle } from "../../redux-slices/articlesSlice"; 
import "bootstrap/dist/css/bootstrap.min.css";
import '../../css/Articles.css';
import { toast } from 'react-toastify';

export default function ArticleForm() {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);

    const formik = useFormik({
        initialValues: {
            title: "",
            body: "",
            category: "",
        },
        validate: (values) => {
            let errors = {};
            if (!values.title) errors.title = "Title is required";
            if (!values.body) errors.body = "Body is required";
            if (!values.category) errors.category = "Category is required";
            return errors;
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = {
                    file:file,
                    title:values.title,
                    body:values.body,
                    category:values.category
                }

                // Dispatch createArticle action
                await dispatch(createArticle(formData))
                toast.success("Article created successfully", { autoClose: 1000 });
                resetForm();
                setFile(null);
            } catch (err) {
                toast.error("Article creation failed. " + err.message);
            }
        },
    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="container mt-4">
            <h2 className="form-title" style={{ color: 'black' }}>Create Article</h2>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Title</label>
                    <input
                        type="text"
                        name="title"
                        className={`form-control ${formik.errors.title ? 'is-invalid' : ''}`}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.title && <div className="invalid-feedback">{formik.errors.title}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Body</label>
                    <textarea
                        name="body"
                        className={`form-control ${formik.errors.body ? 'is-invalid' : ''}`}
                        value={formik.values.body}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.body && <div className="invalid-feedback">{formik.errors.body}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Category</label>
                    <select
                        name="category"
                        className={`form-select ${formik.errors.category ? 'is-invalid' : ''}`}
                        value={formik.values.category}
                        onChange={formik.handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="news">News</option>
                        <option value="blog">Blog</option>
                        <option value="opinion">Opinion</option>
                        <option value="research">Research</option>
                    </select>
                    {formik.errors.category && <div className="invalid-feedback">{formik.errors.category}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Upload File</label>
                    <input
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
