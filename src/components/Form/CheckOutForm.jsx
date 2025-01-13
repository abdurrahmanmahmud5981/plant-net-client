import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";

import "./CheckOutForm";
import Button from "../Shared/Button/Button";

const CheckOutForm = ({ closeModal, purchaseInfo, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 py-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
            complete: {
              color: "#4775f2",
            },
          },
        }}
      />
      <div className="flex justify-around gap-8">
        <Button
          disabled={!stripe}
          type="submit"
          label={`Pay ${purchaseInfo?.price} $`}
        />
        <Button outline onClick={closeModal} label={"Cancel"} />
      </div>
    </form>
  );
};
CheckOutForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  purchaseInfo: PropTypes.shape({
    price: PropTypes.number.isRequired,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default CheckOutForm;
