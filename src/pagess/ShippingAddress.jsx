import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../context/CheckoutContext.jsx";

export default function ShippingAddress() {
  const { shippingAddress, setShippingAddress } = useCheckout();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || !city || !postalCode || !country) {
      alert("Please fill in all fields");
      return;
    }

    setShippingAddress({ address, city, postalCode, country });
    navigate("/checkout"); // go back to checkout page or next step
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}
