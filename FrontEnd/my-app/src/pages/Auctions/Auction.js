import { useFormik } from "formik";
import { useContext, useState } from "react";
import AuthContext from '../../context/AuthContext';

export default function AuctionForm() {
    const { handleAuctionCreation } = useContext(AuthContext);
    const [file, setFile] = useState(null); // State to manage file

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "",
            startDate: "",
            endDate: "",
            startBid: "",
            finalBid: "",
        },

        validate: (values) => {
            let errors = {};

            if (!values.title) {
                errors.title = "Title is required";
            }

            if (!values.description) {
                errors.description = "Description is required";
            }

            if (!values.category) {
                errors.category = "Category is required";
            }

            if (!values.startDate) {
                errors.startDate = "Start Date is required";
            }

            if (!values.endDate) {
                errors.endDate = "End Date is required";
            }

            const startDate = new Date(values.startDate);
            const endDate = new Date(values.endDate);

            if (values.startDate && values.endDate && endDate <= startDate) {
                errors.endDate = "End Date must be after Start Date";
            }

            if (!values.startBid) {
                errors.startBid = "Start Bid is required";
            }

            return errors;
        },

        onSubmit: (values, { resetForm }) => {
            const formData = new FormData(); // Create FormData instance to handle file

            // Append form values
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('category', values.category);
            formData.append('startDate', values.startDate);
            formData.append('endDate', values.endDate);
            formData.append('startBid', values.startBid);
            formData.append('finalBid', values.finalBid);

            if (file) {
                formData.append('file', file); // Append file to formData
            }

            handleAuctionCreation(formData); // Call the function with formData

            if (Object.keys(formik.errors).length === 0) {
                resetForm();
                setFile(null); // Reset file input after submission
            }
        },
    });

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Update the file state with the selected file
    };

    return (
        <div className="container mt-4">
            <h2>Create Auction</h2>
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
                    {formik.errors.title ? <div className="invalid-feedback">{formik.errors.title}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Description</label>
                    <textarea
                        name="description"
                        className={`form-control ${formik.errors.description ? 'is-invalid' : ''}`}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.description ? <div className="invalid-feedback">{formik.errors.description}</div> : null}
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
                        <option value="realEstate">Real Estate</option>
                        <option value="farmMachinery">Farm Machinery</option>
                        <option value="livestock">Livestock</option>
                        <option value="other">Other</option>
                    </select>
                    {formik.errors.category ? <div className="invalid-feedback">{formik.errors.category}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        className={`form-control ${formik.errors.startDate ? 'is-invalid' : ''}`}
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.startDate ? <div className="invalid-feedback">{formik.errors.startDate}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        className={`form-control ${formik.errors.endDate ? 'is-invalid' : ''}`}
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.endDate ? <div className="invalid-feedback">{formik.errors.endDate}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Start Bid</label>
                    <input
                        type="number"
                        name="startBid"
                        className={`form-control ${formik.errors.startBid ? 'is-invalid' : ''}`}
                        value={formik.values.startBid}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.startBid ? <div className="invalid-feedback">{formik.errors.startBid}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Final Bid</label>
                    <input
                        type="number"
                        name="finalBid"
                        className="form-control"
                        value={formik.values.finalBid}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Upload File</label>
                    <input
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={handleFileChange} // Handle file change event
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
