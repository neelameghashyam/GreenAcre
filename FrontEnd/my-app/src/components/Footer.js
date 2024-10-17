// src/components/Footer.js
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Footer.css'; 

function Footer() {
  return (
    <footer className="footer bg-light text-lg-start">
      <div className="container p-4">
        <div className="row">
          {/* Green Acre Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase">Green Acre</h5>
            <ul className="list-unstyled">
            <li>
                <Link to="/rent-receipt" className="text-dark">Rent Receipt</Link>
              </li>
              <li>
                <Link to="/area-converter" className="text-dark">Area Converter</Link>
              </li>
              <li>
                <Link to="/articles" className="text-dark">Articles</Link>
              </li>
              <li>
                <Link to="/auctions" className="text-dark">Auctions</Link>
              </li>
              <li>
                <Link to="/home" className="text-dark">Properties</Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase">Company</h5>
            <ul className="list-unstyled">
            <li>
                <Link to="/about" className="text-dark">About Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-dark">FAQ</Link>
              </li>
              <li>
                <Link to="/terms" className="text-dark">Terms And Conditions</Link>
              </li>
             
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="text-dark">
                <strong>Toll Free:</strong> 1899 99 99999
              </li>
              <li className="text-dark">
                9:30 AM to 6:30 PM (Mon-Sun)
              </li>
              <li className="text-dark">
                <strong>Email:</strong> <a href="mailto:feedback@GreenAcre.com" className="text-dark">feedback@GreenAcre.com</a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase">Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://facebook.com" className="text-dark">Facebook</a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-dark">Twitter</a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-dark">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center py-3 bg-dark text-white">
        <p className="mb-0">© 2024 Green Acre. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
