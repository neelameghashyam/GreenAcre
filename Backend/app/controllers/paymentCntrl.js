import { validationResult } from "express-validator";
import Payment from "../models/paymentModel.js";
import Stripe from 'stripe';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_KEY);

const paymentCntrl = {};

// Create Payment
paymentCntrl.create = async (req, res) => {
  const body = req.body;

  // Validate the input data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create a new customer (optional)
    const customer = await stripe.customers.create({
      name: "Testing",
      email: body.email, // Include email from the request
      address: {
        line1: 'India',
        postal_code: '517501',
        city: 'Tirupati',
        state: 'AP',
        country: 'US',
      },
    });

    // Create a new checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Specify payment method types
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: "Auctions",
          },
          unit_amount: body.amount * 100, // Convert amount to smallest currency unit (paise for INR)
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: 'http://localhost:3000/failed',
      customer: customer.id, // Attach the customer ID (optional)
    });

    // Save payment details to your database (if required)
    const payment = new Payment(body);
    payment.user = body.user; // Make sure this field is set correctly
    payment.transactionId = session.id;
    payment.amount = Number(body.amount);
    payment.paymentType = 'card';
    await payment.save();

    // Respond with session id and URL to redirect the user to
    res.json({ id: session.id, url: session.url });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit Payment
// Edit Payment
paymentCntrl.edit = async (req, res) => {
  const { id } = req.params;  // id is expected to be the transactionId

  try {
    // Find payment by the transaction ID
    const payment = await Payment.findOne({ transactionId: id });
    
    if (!payment) {
      return res.status(404).json({ error: "Payment not found or you're not authorized to edit" });
    }

    const body = req.body;
    
    // Update the payment status
    payment.paymentStatus = body.paymentStatus; // Ensure the key matches

    await payment.save();
    
    return res.status(200)
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete Payment
paymentCntrl.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findOneAndDelete({ _id: id, user: req.userId });
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.status(200).json("Deleted successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Payments
paymentCntrl.getAll = async (req, res) => {
  try {
    const payments = await Payment.find();
    if (payments.length > 0) {
      res.status(200).json(payments);
    } else {
      res.status(404).json("No payments found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get One Payment
paymentCntrl.getOne = async (req, res) => {
  try {
    const payment = await Payment.findOne({ user:req.userId });
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json("Payment not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default paymentCntrl;
