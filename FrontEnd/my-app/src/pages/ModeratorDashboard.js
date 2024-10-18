import React, { useEffect, useMemo, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from '../config/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/sidebar.css'; // Adjust the path as needed

// Register components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ModeratorDashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [auctionsCount, setAuctionsCount] = useState(0);
  const [propertiesData, setPropertiesData] = useState([]);
  const [auctionsData, setAuctionsData] = useState([]);

  // Fetch data for users, properties, and auctions on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('/api/user/accounts', {
          headers: { 'Authorization': localStorage.getItem('token') },
        });
        const propertiesResponse = await axios.get('/api/property/posts', {
          headers: { 'Authorization': localStorage.getItem('token') },
        });
        const auctionsResponse = await axios.get('/api/auction/all', {
          headers: { 'Authorization': localStorage.getItem('token') },
        });

        setUsersCount(usersResponse.data.length);
        setPropertiesCount(propertiesResponse.data.length);
        setAuctionsCount(auctionsResponse.data.length);

        setPropertiesData(propertiesResponse.data);
        setAuctionsData(auctionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Calculate properties by category
  const propertiesByCategory = useMemo(() => {
    const categories = ['Farm Land', 'Dairy Farm', 'Poultry Farm', 'Agri Industrial', 'Other'];
    const counts = categories.map(cat => propertiesData.filter(p => p.propertyType === cat).length);
    return counts;
  }, [propertiesData]);

  // Calculate auctions by category
  const auctionsByCategory = useMemo(() => {
    const categories = ['realEstate', 'farmMachinery', 'livestock', 'other'];
    const counts = categories.map(cat => {
      return auctionsData.filter(a => a.category && a.category.toLowerCase() === cat.toLowerCase()).length;
    });
    return counts;
  }, [auctionsData]);

  // Pie chart data for properties
  const propertiesPieData = useMemo(() => ({
    labels: ['Farm Land', 'Dairy Farm', 'Poultry Farm', 'Agri Industrial', 'Other'],
    datasets: [
      {
        data: propertiesByCategory,
        backgroundColor: [
          'rgba(0, 128, 0, 0.6)',      // green
          'rgb(101, 163, 255)',      // blue
          'rgba(210, 105, 30, 0.6)',   // orange-brown
          'rgba(128, 128, 0, 0.6)',    // olive
          'rgba(0, 0, 0, 0.6)',        // black
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  }), [propertiesByCategory]);

  // Pie chart data for auctions
  const auctionsPieData = useMemo(() => ({
    labels: ['Real Estate', 'Farm Machinery', 'Livestock', 'Other'],
    datasets: [
      {
        data: auctionsByCategory,
        backgroundColor: [
          'rgba(0, 128, 0, 0.6)',      // green
          'rgb(101, 163, 255)',      // blue
          'rgba(210, 105, 30, 0.6)',   // orange-brown
          'rgba(0, 0, 0, 0.6)',        // black
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  }), [auctionsByCategory]);

  // Pie chart options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0, // Disable animation
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky" style={{ paddingTop: "40px" }}>
            <h5 className="sidebar-heading">Moderator Dashboard</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="/all-auctions">
                  All Auctions
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/all-properties">
                  All Properties
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/results-calculation-auctions">
                  Auctions Results Calculations
                </a>
              </li>
            
              <li className="nav-item">
                <a className="nav-link" href="/my-properties">
                  My Properties
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/my-auctions">
                  My Auctions
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-4" style={{ paddingTop: "40px" }}>
          <h3>Overview</h3>

          {/* Display count of users, properties, and auctions */}
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5>Total Users</h5>
                  <h4><b>{usersCount}</b></h4>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5>Total Properties</h5>
                  <h4><b>{propertiesCount}</b></h4>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5>Total Auctions</h5>
                  <h4><b>{auctionsCount}</b></h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <br /><h4>Properties by Category</h4><br />
              <div className="chart-container" style={{ width: '80%', height: '300px' }}>
                <Pie data={propertiesPieData} options={pieOptions} />
              </div>
            </div>

            <div className="col-md-6">
              <br /><h4>Auctions by Category</h4><br />
              <div className="chart-container" style={{ width: '70%', height: '300px' }}>
                {auctionsByCategory.some(count => count > 0) ? (
                  <Pie data={auctionsPieData} options={pieOptions} />
                ) : (
                  <p>No data available for auctions.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
