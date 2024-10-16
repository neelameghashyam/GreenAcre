import React, { useEffect, useMemo, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from '../config/axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  // Check if auctionsByCategory is calculated correctly
  console.log("Auctions by Category:", auctionsByCategory);

  // Pie chart data for properties
  const propertiesPieData = useMemo(() => ({
    labels: ['Farm Land', 'Dairy Farm', 'Poultry Farm', 'Agri Industrial', 'Other'],
    datasets: [
      {
        data: propertiesByCategory,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
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
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
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
          <div className="sidebar-sticky">
            <h5 className="sidebar-heading">Moderator Dashboard</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link" href="/all-auctions" target="_blank" rel="noopener noreferrer">
                  All Auctions
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/all-properties" target="_blank" rel="noopener noreferrer">
                  All Properties
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/results-calculation-auctions" target="_blank" rel="noopener noreferrer">
                  Auctions Results Calculations
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/my-properties" target="_blank" rel="noopener noreferrer">
                  My Properties
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/my-auctions" target="_blank" rel="noopener noreferrer">
                  My Auctions
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
          <h2>Admin Dashboard Overview</h2>

          {/* Display count of users, properties, and auctions */}
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5>Total Users</h5>
                  <p>{usersCount}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5>Total Properties</h5>
                  <p>{propertiesCount}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5>Total Auctions</h5>
                  <p>{auctionsCount}</p>
                </div>
              </div>
            </div>
          </div>

          <h4>Charts Overview</h4>
          <div className="row">
            <div className="col-md-6">
              <h4>Properties by Category</h4>
              <div className="chart-container" style={{ width: '100%', height: '400px' }}>
                <Pie data={propertiesPieData} options={pieOptions} />
              </div>
            </div>

            <div className="col-md-6">
              <h4>Auctions by Category</h4>
              <div className="chart-container" style={{ width: '100%', height: '400px' }}>
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
