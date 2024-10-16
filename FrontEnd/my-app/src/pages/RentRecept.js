import React, { useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../bgImgs/Green_Acre.png'; // Adjust the path as necessary

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#fff',
    color: '#000',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    border: '1px solid #000',
    borderRadius: 3,
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecoration: 'underline',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 12,
    width: '40%',
  },
  value: {
    fontSize: 12,
    width: '60%',
    textAlign: 'left',
  },
  longText: {
    fontSize: 12,
    width: '100%',
    flexWrap: 'wrap',
    wordWrap: 'break-word',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    marginBottom: 25,          
  },
  logo: {
    width: 120,               
    height: 60,               
    marginBottom: 15,         
  },
  signature: {
    marginTop: 40,
    borderTop: '1px solid #000',
    width: '50%',
    textAlign: 'center',
    paddingTop: 5,
    alignSelf: 'flex-end',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#777',
  },
});

// PDF Document component
const RentReceiptDocument = ({ receiptData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.logoContainer}>
        <Image src={logo} style={styles.logo} />
      </View>

      <Text style={styles.heading}>Rent Receipt</Text>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Tenant Name:</Text>
          <Text style={styles.value}>{receiptData.tenantName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Owner Name:</Text>
          <Text style={styles.value}>{receiptData.ownerName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Rent Amount (Rs):</Text>
          <Text style={styles.value}>{receiptData.rentAmount}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Owner PAN:</Text>
          <Text style={styles.value}>{receiptData.ownerPan}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Rented Property Address:</Text>
          <Text style={styles.longText}>{receiptData.rentedAddress}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Owner Address:</Text>
          <Text style={styles.longText}>{receiptData.ownerAddress}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Receipt Start Date:</Text>
          <Text style={styles.value}>{receiptData.startDate}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Receipt End Date:</Text>
          <Text style={styles.value}>{receiptData.endDate}</Text>
        </View>
      </View>

      <View style={styles.signature}>
        <Text>Signature</Text>
      </View>
    </Page>
  </Document>
);

// Main Component
const RentReceipt = () => {
  const [formData, setFormData] = useState({
    tenantName: '',
    ownerName: '',
    rentAmount: '',
    ownerPan: '',
    rentedAddress: '',
    ownerAddress: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClearForm = () => {
    setFormData({
      tenantName: '',
      ownerName: '',
      rentAmount: '',
      ownerPan: '',
      rentedAddress: '',
      ownerAddress: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center"  style={{ color: 'black' }}>Generate Rent Receipt Online</h2>
      <form>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label" style={{ color: 'black' }}>Tenant Name:</label>
            <input
              type="text"
              name="tenantName"
              className="form-control"
              value={formData.tenantName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: 'black' }}>Owner Name:</label>
            <input
              type="text"
              name="ownerName"
              className="form-control"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label" style={{ color: 'black' }}>Rent Amount (Rs):</label>
            <input
              type="text"
              name="rentAmount"
              className="form-control"
              value={formData.rentAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: 'black' }}>Owner PAN:</label>
            <input
              type="text"
              name="ownerPan"
              className="form-control"
              value={formData.ownerPan}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6"> 
            <label className="form-label" style={{ color: 'black' }}>Rented Property Address:</label>
            <input
              type="text"
              name="rentedAddress"
              className="form-control"
              value={formData.rentedAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: 'black' }}>Owner Address:</label>
            <input
              type="text"
              name="ownerAddress"
              className="form-control"
              value={formData.ownerAddress}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label" style={{ color: 'black' }}>Receipt Start Date:</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: 'black' }}>Receipt End Date:</label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <PDFDownloadLink
          document={<RentReceiptDocument receiptData={formData} />}
          fileName="Rent_Receipt.pdf"
          className="btn btn-primary"
          onClick={handleClearForm} // Clear the form after PDF generation
        >
          {({ loading }) => loading ? 'Generating document...' : 'Generate Receipt'}
        </PDFDownloadLink>
      </form>
    </div>
  );
};

export default RentReceipt;
