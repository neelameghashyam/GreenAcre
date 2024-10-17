import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MainHome.css'; // Custom CSS for additional styling
import { Link } from 'react-router-dom';

// Import images
import advAgri from '../bgImgs/Adv Agri.jpeg';
import cheapLand from '../bgImgs/Cheap Land.jpeg';
import poultryFarm from '../bgImgs/poultry farm.jpeg';
import Isolatedfarm from '../bgImgs/Isolatedfarm.jpeg';
import homebg from '../bgImgs/homebg.jpg';

const MainHome = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          position: 'relative', // Important for positioning the overlay
          backgroundImage: `url(${homebg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'relative', // Ensure background remains fixed
          height: '100vh',
        }}
      >
        {/* Overlay for opacity */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 1, // Ensures it is between the background and the content
          }}
        ></div>

        {/* Content on top of the overlay */}
        <div className="overlay d-flex align-items-center justify-content-center" style={{ position: 'relative', zIndex: 2 }}>
          <div className="text-center text-white">
            <br /><br /><br /><br />
            <h1 className="display-3" style={{ paddingTop: '40px' }}>
              <b> Find the Perfect Agricultural, Estate, and Agri-Industrial Lands with Ease</b>
            </h1>
            <b><p className="lead">Comprehensive end-to-end services for managing agricultural properties</p></b>
            <a href="/home" className="btn btn-primary btn-lg mt-3">
              Explore More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: 'black' }}>Choose the Best Properties</h2>
          <div className="row align-items-center">
            <div className="col-md-8 order-md-2">
              <img src={Isolatedfarm} alt="Agricultural Land" className="img-fluid rounded shadow custom-img" />
            </div>
            <div className="col-md-4 order-md-1">
              <h3 className="mb-4">Wide Selection of Properties</h3>
              <p>
                Explore a wide selection of properties designed to meet your unique requirements, from agricultural and industrial lands to estate and sustainable options.
              </p>
              <p>
                Invest in the future with confidence by selecting the perfect property for your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Green Acre */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Agricultural Lands</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <Link to="/property" className="text-decoration-none">
                <div className="card p-3 mb-4 shadow">
                  <img src={cheapLand} alt="Cheap Land" className="card-img-top rounded img-fluid" />
                  <div className="card-body">
                    <h5 className="card-title">List Your Agricultural Land</h5>
                    <p className="card-text">
                      Sell or lease your agricultural land with ease. Our platform ensures maximum visibility with direct buyer contact.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/home" className="text-decoration-none">
                <div className="card p-3 mb-4 shadow">
                  <img src={advAgri} alt="Advanced Agriculture" className="card-img-top rounded img-fluid" />
                  <div className="card-body">
                    <h5 className="card-title">Agri-Industrial Lands</h5>
                    <p className="card-text">
                      Entrepreneurs in the agri sector can find and purchase industrial lands tailored to their needs.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/home" className="text-decoration-none">
                <div className="card p-3 mb-4 shadow">
                  <img src={poultryFarm} alt="Poultry Farm" className="card-img-top rounded img-fluid" />
                  <div className="card-body">
                    <h5 className="card-title">Agro Processing Clusters</h5>
                    <p className="card-text">
                      Developers of Agro Processing Clusters and Food Parks can list their plots for sale, connecting with the right buyers.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainHome;
