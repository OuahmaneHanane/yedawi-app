import DonateButton from './DonationButton';

const DonationSummary = ({ formData, onEdit, onComplete, showPrint = false }) => {
  const total = parseFloat(formData.amount || 0);
  const tip = (total * 0.03).toFixed(2);
  const baseAmount = (total - parseFloat(tip)).toFixed(2);
  const isPayPal = formData.method === "PayPal";

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 font-serif">
        Donation Summary
      </h2>

      <div className="space-y-4 text-gray-700 text-sm leading-normal">
        <div>
          <p className="text-gray-500 text-xs uppercase font-medium">Full Name</p>
          <p className="font-medium text-base">{formData.fullName}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-medium">Email</p>
          <p className="font-medium text-base">{formData.email}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-medium">Phone</p>
          <p className="font-medium text-base">{formData.phone || 'Not provided'}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-medium">Payment Method</p>
          <p className="font-medium text-base">{formData.method}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-medium">Base Amount</p>
          <p className="font-medium text-base">${baseAmount}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-medium">Yedawi Tip (3%)</p>
          <p className="font-medium text-base">${tip}</p>
        </div>

        <div className="pt-4 border-t">
          <p className="text-gray-500 text-xs uppercase font-medium">Total</p>
          <p className="text-2xl font-bold text-green-600">${total.toFixed(2)}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase font-medium">Recurring Donation</p>
          <p className="font-medium text-base">
            {formData.recurring ? `Yes – ${formData.recurrenceType || 'Monthly'}` : 'No'}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between items-center">
  <button
    onClick={onEdit}
    className="w-full sm:w-auto px-5 h-[42px] text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
  >
    Edit
  </button>

  {isPayPal ? (
    <div className="w-full sm:w-auto max-w-[300px] min-w-[220px] h-[42px] flex items-center justify-center">
      <div className="w-full">
        <DonateButton amount={total} onSuccess={onComplete} />
      </div>
    </div>
  ) : (
    <button
      onClick={onComplete}
      className="w-full sm:w-auto px-6 h-[42px] rounded-md bg-green-600 text-white hover:bg-green-700 transition font-semibold"
    >
      Confirm & Donate
    </button>
  )}
</div>

      {showPrint && (
        <button
          onClick={() => window.print()}
          className="mt-4 w-full bg-gray-800 text-white py-2 rounded-md hover:bg-black transition"
        >
          Print Receipt
        </button>
      )}
    </div>
  );
};

export default DonationSummary;
