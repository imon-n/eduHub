import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { courseId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { isPending, data: coursesInfo = {} } = useQuery({
    queryKey: ["courses", courseId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courses/${courseId}`);
      return res.data;
    },
  });

  if (isPending) {
    return "...loading";
  }

  const amount = coursesInfo.registrationFee;
  const amountInCents = amount * 100;
  // console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // Step 1: Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    console.log(paymentMethod);

    if (error) {
      setError(error.message);
      return;
    }

    setError("");

    try {
      // Step 2: Create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        courseId,
      });

      const clientSecret = res.data.clientSecret;

      // Step 3: Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {

        console.log("transactionId - ", result.paymentIntent.id);

        if (result.paymentIntent.status === "succeeded") {
          const transactionId = result.paymentIntent.id;
          // Step 4: Try to record the payment
          const paymentData = {
            courseId,
            title: coursesInfo.title,
            email: user.email,
            amount: amountInCents / 100,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
          };

          try {
            const paymentRes = await axiosSecure.post("/payments", paymentData);

            if (paymentRes.data.insertedId) {
              await Swal.fire({
                icon: "success",
                title: "Payment Successful!",
                html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                confirmButtonText: "Go to My Courses",
              });
              navigate("/dashboard/bookedSession");
            }
          } catch (paymentErr) {
            if (paymentErr.response?.status === 409) {
              Swal.fire({
                icon: "error",
                title: "Already Booked!",
                text: "You have already paid for this course.",
              });
            }
          }
        }
      }
    } catch (err) {
      console.error("Error creating payment intent:", err);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded"></CardElement>
        <button
          type="submit"
          className="btn bg-[#61b25dfe] text-black w-full"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
