import {useEffect} from 'react';
import axios from '../../config/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import successImage from '../../bgImgs/sucess.png'; // Ensure the path is correct

export default function Success() {

  useEffect(() => {
    (async () => {
      try {
        const stripeId = localStorage.getItem('stripeId');
        
        if (stripeId) {

        await axios.put(`/api/payment/edit/${stripeId}`,{paymentStatus:'success'}, {
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
        <img src={successImage} alt="Payment Successful" className="img-fluid mb-4" style={{ maxWidth: '400px' }} />
        <h2 className="text-success display-4">Payment Successful!</h2>
        <p className="lead">Thank you for your payment. Your payment has been processed successfully.</p>
        <a href="/auctions" className="btn btn-primary mt-3">Go to Auctions Page</a>
      </div>
    </div>
  );
}
