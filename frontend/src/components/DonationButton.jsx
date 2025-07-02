import React, { useEffect, useRef } from 'react';

const DonateButton = ({ amount = "10.00", onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    if (!window.paypal || !paypalRef.current) return;

    // Clear previous buttons (to prevent duplicates)
    paypalRef.current.innerHTML = "";

    window.paypal.Buttons({
      style: {
        color: 'gold',
        shape: 'pill',
        label: 'paypal',
        height: 40
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: "10.00",
              currency_code: "USD"
            }
          }]
        });
      },
      onApprove: async (data, actions) => {
        const details = await actions.order.capture();
        console.log("Donation approved: ", details);
        if (onSuccess) onSuccess(details);
      },
      onError: (err) => {
        console.error("PayPal error:", err);
        alert("❌ Payment failed. Please try again.");
      }
    }).render(paypalRef.current);
  }, [amount, onSuccess]);

  return <div ref={paypalRef} />;
};

export default DonateButton;
