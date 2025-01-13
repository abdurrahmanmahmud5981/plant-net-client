import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";

import "./CheckOutForm";
import Button from "../Shared/Button/Button";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CheckOutForm = ({ closeModal, purchaseInfo, refetch, totalQuantity }) => {
  const navigate = useNavigate();
  // const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    getPaymentIntent();
  }, [purchaseInfo]);
  console.log(clientSecret);
  const getPaymentIntent = async () => {
    try {
      const { data = {} } = await axiosSecure.post("/create-payment-intent", {
        quantity: purchaseInfo?.quantity,
        plantId: purchaseInfo?.plantId,
      });
      setClientSecret(data?.clientSecret);
    } catch (err) {
      console.log(err);
    }
  };

  const stripe = useStripe();
  const elements = useElements();
  console.log(stripe);
  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      setProcessing(false);
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      setProcessing(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setProcessing(false);
      console.log("[error]", error);
    } else {
      setProcessing(false);
      console.log("[PaymentMethod]", paymentMethod);
    }

    // cofirm the payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: purchaseInfo?.customer?.name,
          email: purchaseInfo?.customer?.email,
        },
      },
    });
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      try {
        await axiosSecure.post("/orders", {
          ...purchaseInfo,
          transactionId: paymentIntent?.id,
        });
        // decrease quantity
        await axiosSecure.patch(`/plants/quantity/${purchaseInfo?.plantId}`, {
          quantityToUpdate: totalQuantity,
          status: "decrease",
        });
        refetch();
        toast.success("Purchase Successful");
        navigate("/dashboard/my-orders");
      } catch (err) {
        console.log(err);
      } finally {
        setProcessing(false);
        closeModal();
      }
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
          disabled={!stripe || !clientSecret || processing}
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
  purchaseInfo: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  totalQuantity: PropTypes.number.isRequired,
};

export default CheckOutForm;
