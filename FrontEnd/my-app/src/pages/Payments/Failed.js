import {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import failedImage from '../../bgImgs/failed.png'; // Import the failed image
import axios from '../../config/axios';
export default function Failed() {

  useEffect(() => {
    (async () => {
      try {
        const stripeId = localStorage.getItem('stripeId');
        
        if (stripeId) {

          await axios.put(`/api/payment/edit/${stripeId}`,{paymentStatus:'failed'}, {
            headers: { 'Authorization': localStorage.getItem('token') },
          });
        } else {
          console.log('No Stripe ID found in local storage.');
        }
      } catch (err) {
        console.log('Error fetching payment details:', err);
      }
    })();
  }, []);


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <img src={failedImage} alt="Payment Failed" className="img-fluid mb-4" style={{ maxWidth: '400px' }} />
        <h2 className="text-danger display-4">Payment Failed!</h2>
        <p className="lead">Unfortunately, your payment could not be processed. Please try again.</p>
        <a href="/auctions" className="btn btn-danger mt-3">Return to Auctions</a>
      </div>
    </div>
  );
}
