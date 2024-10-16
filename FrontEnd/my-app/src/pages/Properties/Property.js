import { useFormik } from "formik";
import { useContext, useState } from "react";
import AuthContext from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const statesAndDistricts = [
    {
        "state": "Andhra Pradesh",
        "districts": [
            "Anantapur",
            "Chittoor",
            "East Godavari",
            "Guntur",
            "Krishna",
            "Kurnool",
            "Nellore",
            "Prakasam",
            "Srikakulam",
            "Visakhapatnam",
            "Vizianagaram",
            "West Godavari",
            "YSR Kadapa"
        ]
    },
    // Add more states as needed
];

export default function Property() {
    const { handlePropertyCreation } = useContext(AuthContext);
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedFile, setSelectedFile] = useState(null); // For storing selected file

    const formik = useFormik({
        initialValues: {
            type: "",
            propertyType: "",
            mapLocation: "",
            description: "",
            state: "",
            city: "",
            locality: "",
            address: "",
            area: "",
            unitMeasurement: "",
            ownerShip: "",
            price: "",
        },

        validate: (values) => {
            let errors = {};

            if (!values.type) errors.type = "Type is required";
            if (!values.propertyType) errors.propertyType = "Property type is required";
            if (!values.state) errors.state = "State is required";
            if (!values.city) errors.city = "City is required";
            if (!values.ownerShip) errors.ownerShip = "Ownership is required";
            if (!values.mapLocation) errors.mapLocation = "Map location is required";
            if (!values.description) errors.description = "Description is required";
            if (!values.area) errors.area = "Area is required";
            if (!values.unitMeasurement) errors.unitMeasurement = "Unit measurement is required";
            if (!values.price) errors.price = "Price is required";

            return errors;
        },

        onSubmit: (values) => {
            const formData = new FormData(); // Use FormData to handle file and other inputs
            for (const key in values) {
                formData.append(key, values[key]); // Append all form values
            }

            if (selectedFile) {
                formData.append("file", selectedFile); // Append the file if selected
            }

            handlePropertyCreation(formData); // Send FormData to the handler
        },
    });

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Capture the selected file
    };

    const handleStateChange = (event) => {
        const selected = event.target.value;
        setSelectedState(selected);
        setSelectedDistrict("");
        formik.setFieldValue("state", selected);
        formik.setFieldValue("city", "");
    };

    const handleDistrictChange = (event) => {
        const selected = event.target.value;
        setSelectedDistrict(selected);
        formik.setFieldValue("city", selected);
    };

    const selectedStateObject = statesAndDistricts.find(stateObj => stateObj.state === selectedState);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Property Listing</h2>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Type</label>
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
                    {formik.errors.type ? <div className="text-danger">{formik.errors.type}</div> : null}
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
                    {formik.errors.propertyType ? <div className="text-danger">{formik.errors.propertyType}</div> : null}
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
                        {statesAndDistricts.map(stateObj => (
                            <option key={stateObj.state} value={stateObj.state}>{stateObj.state}</option>
                        ))}
                    </select>
                    {formik.errors.state ? <div className="text-danger">{formik.errors.state}</div> : null}
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
                    {formik.errors.city ? <div className="text-danger">{formik.errors.city}</div> : null}
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
                        <option value="owned">Owned</option>
                        <option value="leased">Leased</option>
                    </select>
                    {formik.errors.ownerShip ? <div className="text-danger">{formik.errors.ownerShip}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Map Location</label>
                    <input
                        type="text"
                        name="mapLocation"
                        className="form-control"
                        value={formik.values.mapLocation}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.mapLocation ? <div className="text-danger">{formik.errors.mapLocation}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.description ? <div className="text-danger">{formik.errors.description}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Locality</label>
                    <input
                        type="text"
                        name="locality"
                        className="form-control"
                        value={formik.values.locality}
                        onChange={formik.handleChange}
                    />
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
                    {formik.errors.area ? <div className="text-danger">{formik.errors.area}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Unit Measurement</label>
                    <select
                        name="unitMeasurement"
                        className="form-select"
                        value={formik.values.unitMeasurement}
                        onChange={formik.handleChange}
                    >
                        <option value="">Select Unit Measurement</option>
                        <option value="sqft">Square Feet</option>
                        <option value="acres">Acres</option>
                        <option value="hectares">Hectares</option>
                    </select>
                    {formik.errors.unitMeasurement ? <div className="text-danger">{formik.errors.unitMeasurement}</div> : null}
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
                    {formik.errors.price ? <div className="text-danger">{formik.errors.price}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Upload Property Image</label>
                    <input
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={handleFileChange} // Capture file input
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
