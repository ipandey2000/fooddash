import React, { useState } from "react";
import { PropagateLoader } from "react-spinners";

const Success = () =>
{
  const [loading, setLoading] = useState( false );
  const [success, setSuccess] = useState( false );

  const handlePayment = () =>
  {
    setLoading( true );

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Enter your Razorpay key ID
      amount: 50000, // Amount in paise (e.g., 50000 paise = ₹500)
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png", // Optional logo URL
      handler: function ( response )
      {

        setLoading( false );
        setSuccess( true );
        console.log( response.razorpay_payment_id );
        console.log( response.razorpay_order_id );
        console.log( response.razorpay_signature );
      },
      prefill: {
        name: "Your Name",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Your Address",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp1 = new window.Razorpay( options );

    rzp1.on( "payment.failed", function ( response )
    {
      setLoading( false );
      alert( response.error.description );
      console.error( response.error );
    } );

    rzp1.open();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      { !loading && !success && (
        <button
          onClick={ handlePayment }
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Make Payment
        </button>
      ) }

      { loading && <PropagateLoader color="#36d7b7" /> }

      { !loading && success && (
        <div className="text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Payment Success"
            className="mb-4"
          />
          <h2 className="text-3xl font-semibold mb-4 text-green-600">
            Payment Successful!
          </h2>
          <p>Your payment has been successfully processed.</p>
        </div>
      ) }
    </div>
  );
};

export default Success;
