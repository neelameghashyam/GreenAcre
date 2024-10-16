import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import '../css/Faq.css'; // Import your custom CSS file

export default function Faq() {
    return (
        <div className="container mt-5">
            <h2 className="faq-title">Frequently Asked Questions (FAQs)</h2>
            <Accordion defaultActiveKey="0">
                {faqData.map((faq, index) => (
                    <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header>
                            <strong>{faq.question}</strong>
                        </Accordion.Header>
                        <Accordion.Body>
                            {faq.answer}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
            <div className="mt-4 faq-contact">
               <b> For any further inquiries or assistance, feel free to contact our support team at Green Acre. We are here to help!</b>
            </div>
        </div>
    );
}

// Sample data for FAQs
const faqData = [
    {
        question: "What is Green Acre?",
        answer: "Green Acre is an innovative online platform dedicated to the buying, selling, and leasing of agricultural lands, dairy farms, and eco-friendly properties. We aim to create a seamless marketplace that connects farmers and buyers, making transactions easier and more efficient."
    },
    {
        question: "Is Green Acre a registered company?",
        answer: "Yes, Green Acre operates under Szuper Agridigital Solutions Private Ltd, which is registered with the Registrar of Companies (ROC) under the Companies Act, 2013."
    },
    {
        question: "How do I register on Green Acre?",
        answer: (
            <>
                To register, follow these steps:
                <ol>
                    <li>Click on the <strong>Sign Up</strong> button.</li>
                    <li>Fill in your name, password, email ID, and mobile number in the registration form.</li>
                    <li>Confirm your mobile number with the OTP received.</li>
                    <li>Submit the registration form.</li>
                    <li>Verify your email through the link sent to your email address to activate your account.</li>
                </ol>
            </>
        )
    },
    {
        question: "Is my information safe?",
        answer: "Yes, your information is safe and securely stored in an encrypted format. We have a comprehensive Privacy Policy in place to protect your information."
    },
    {
        question: "How do I list or post a property on Green Acre?",
        answer: (
            <>
                <ol>
                    <li>Log in to your account. If you don’t have an account, please sign up first.</li>
                    <li>Once logged in, click on <strong>Add a Listing</strong> in the header or profile menu bar.</li>
                    <li>Select the category: <strong>Farm Lands</strong>, <strong>Dairy Farms</strong>, or <strong>Agricultural Properties</strong> from the drop-down list.</li>
                    <li>Fill in the listing form with the property description, price, acreage, location, etc.</li>
                    <li>Upload images of your property and click <strong>Submit</strong>.</li>
                </ol>
                <em>Note: Your listing is subject to approval by Green Acre.</em>
            </>
        )
    },
    {
        question: "Is there any fee for listing a property on Green Acre?",
        answer: "No, there is no fee for listing agricultural properties. Listing is free for all users. If a seller wishes to promote their property or utilize additional features, they may opt for <strong>PRO</strong> or <strong>PRO PLUS</strong> services."
    },
    {
        question: "How do I participate in an auction on Green Acre?",
        answer: (
            <>
                <ol>
                    <li>Log in to your account.</li>
                    <li>Browse the auction listings available on the platform.</li>
                    <li>Click on the auction you’re interested in.</li>
                    <li>Review the property details and bidding instructions.</li>
                    <li>Place your bid by entering your desired amount and confirming your bid.</li>
                </ol>
            </>
        )
    },
    {
        question: "What are the bidding increments for auction listings?",
        answer: "Bidding increments vary depending on the auction and will be specified in the auction details. Ensure you read the bidding instructions carefully before placing a bid."
    },
    {
        question: "Can I withdraw my bid once it has been placed?",
        answer: "Once a bid has been placed, it cannot be withdrawn. Please ensure that you are confident in your bid amount before submitting it."
    }
];
