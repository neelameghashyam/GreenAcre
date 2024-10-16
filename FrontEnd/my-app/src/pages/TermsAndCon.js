import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TermsAndCon() {
    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center" style={{ color: 'black' }}>Terms and Conditions for Green Acre</h1>
            <p className="text-center">Welcome to Green Acre! These Terms and Conditions govern your use of our services, including property listings and auction services. By accessing or using our platform, you agree to comply with and be bound by these terms.</p>

            <div className="mt-5">
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h4 style={{ color: 'black' }}>1. Acceptance of Terms</h4>
                        <p>By using Green Acre, you confirm that you accept these Terms and Conditions and that you agree to comply with them. If you do not agree with any part of these terms, you must not use our services.</p>
                    </div>
                </div>

                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h4 style={{ color: 'black' }}>2. Definitions</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>“Green Acre”</strong> refers to the online platform operated by Szuper Agridigital Solutions Private Ltd for the buying, selling, and leasing of agricultural lands, dairy farms, and eco-friendly properties.</li>
                            <li className="list-group-item"><strong>“User”</strong> refers to any individual or entity using our platform to list, buy, sell, or auction properties.</li>
                            <li className="list-group-item"><strong>“Property Listings”</strong> refers to the advertisements or postings made by users regarding available properties for sale or lease.</li>
                            <li className="list-group-item"><strong>“Auction Listings”</strong> refers to properties listed for auction on our platform.</li>
                        </ul>
                    </div>
                </div>

                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h4 style={{ color: 'black' }}>3. Property Listings</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Users may list their properties for sale or lease on Green Acre.</li>
                            <li className="list-group-item">All property listings must be accurate and not misleading. Users are responsible for the content and legality of their listings.</li>
                            <li className="list-group-item">Green Acre reserves the right to review, approve, or reject any property listings at our discretion.</li>
                        </ul>
                    </div>
                </div>

                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h4 style={{ color: 'black' }}>4. Auction Services</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Green Acre provides auction services for properties listed on our platform.</li>
                            <li className="list-group-item">Users wishing to auction their properties must submit their auction listings in accordance with our guidelines.</li>
                            <li className="list-group-item">All auction listings will be subject to our review and approval.</li>
                        </ul>
                    </div>
                </div>

                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h4 style={{ color: 'black' }}>5. Bidding Process</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Users participating in auctions must register on Green Acre and agree to these Terms and Conditions.</li>
                            <li className="list-group-item">Bids must be placed through the auction interface provided on our platform.</li>
                            <li className="list-group-item">Once a bid is submitted, it cannot be withdrawn or altered.</li>
                            <li className="list-group-item">The highest bid at the end of the auction period will be deemed the winning bid.</li>
                        </ul>
                    </div>
                </div>

                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h4 style={{ color: 'black' }}>6. Payment Terms</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Transaction Fees:</strong> Green Acre may charge transaction fees for successful property sales or auctions, which will be disclosed prior to the completion of the transaction.</li>
                            <li className="list-group-item"><strong>Payment Methods:</strong> Payments for property transactions must be made through the designated payment methods outlined on our platform.</li>
                            <li className="list-group-item"><strong>Payment Security:</strong> We take reasonable measures to protect your payment information, but we cannot guarantee the absolute security of your data.</li>
                            <li className="list-group-item"><strong>Refund Policy:</strong> All payments made are non-refundable unless otherwise specified in our policies.</li>
                        </ul>
                    </div>
                </div>

                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h4 style={{ color: 'black' }}>7. User Responsibilities</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Users must maintain the confidentiality of their account information and are responsible for all activities that occur under their account.</li>
                            <li className="list-group-item">Users must comply with all applicable laws and regulations related to property transactions, including but not limited to land use and ownership laws.</li>
                        </ul>
                    </div>
                </div>

                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h4 style={{ color: 'black' }}>8. Limitation of Liability</h4>
                        <p>Green Acre is not liable for any direct, indirect, incidental, or consequential damages resulting from the use of our services or the inability to access our platform. We do not guarantee the accuracy or completeness of any property listings or auction information.</p>
                    </div>
                </div>

                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h4 style={{ color: 'black' }}>9. Changes to Terms</h4>
                        <p>Green Acre reserves the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our website. Your continued use of the platform after any changes constitutes your acceptance of the new terms.</p>
                    </div>
                </div>

                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h4 style={{ color: 'black' }}>10. Governing Law</h4>
                        <p>These Terms and Conditions are governed by the laws of [Insert Jurisdiction]. Any disputes arising out of or related to these terms will be resolved in the appropriate courts of that jurisdiction.</p>
                    </div>
                </div>

                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h4 style={{ color: 'black' }}>11. Contact Information</h4>
                        <p>For any questions regarding these Terms and Conditions, please contact our support team at Green Acre.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
