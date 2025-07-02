import DonateButton from './DonationButton'; 

const DonationSummary = ({ formData, onEdit, onComplete, showPrint = false }) => {
  const amount = parseFloat(formData.amount || 0);
  const tip = (amount * 0.03).toFixed(2);
  const total = (amount).toFixed(2);

  const isPayPal = formData.method === "PayPal";

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
        Review Your Donation
      </h2>

      <div className="space-y-2 text-sm">
        <div><strong>Full Name:</strong> {formData.fullName}</div>
        <div><strong>Email:</strong> {formData.email}</div>
        <div><strong>Phone:</strong> {formData.phone || 'Not provided'}</div>
        <div><strong>Donation Amount:</strong> {amount} USD</div>
        <div><strong>Yedawi Tip (3%):</strong> {tip} USD</div>
        <div><strong><u>Total:</u></strong> <strong>{total} USD</strong></div>
        <div><strong>Payment Method:</strong> {formData.method}</div>
        <div><strong>Recurring Donation:</strong> {formData.recurring ? 'Yes' : '_'}</div>
        {formData.recurring && (
          <div><strong>Recurrence Type:</strong> {formData.recurrenceType || 'Monthly'}</div>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
        >
          Edit
        </button>

        {!isPayPal ? (
          <button
            onClick={onComplete}
            className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-00 transition"
          >
            Confirm & Donate
          </button>
        ) : (
          <div className="w-full">
            <DonateButton amount={total} onSuccess={onComplete} />
          </div>
        )}
      </div>

      {showPrint && (
        <button
          onClick={() => window.print()}
          className="mt-4 w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          Print Receipt
        </button>
      )}
    </div>
  );
};

export default DonationSummary;
