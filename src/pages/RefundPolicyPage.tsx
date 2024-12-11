import { Link } from "react-router-dom";

type Props = {};

const RefundPolicyPage = (props: Props) => {
  return (
    <>
      <div className="flex justify-center items-center py-5 px-2 flex-col">
        <div className="text-center flex justify-center items-center flex-col gap-5 font-archivo mb-4">
          <h1 className="text-7xl md:text-6xl sm:text-5xl font-bold">
            Refund Policy
          </h1>
          {/* <p className="font-extralight text-base max-w-xl">
        Here you can check the size of your Hobbie to fit exactly your body.😁
      </p> */}
        </div>
        {/* Content Here */}

        {/* Block of Content */}
        <div className="w-full max-w-4xl mx-auto font-archivo">
          <h3 className="text-2xl font-bold text-center">Return Policy:</h3>
          <p className="text-lg font-normal text-center md:text-base text-gray-600">
            <br />
            <br />
            Return Period: You can request a return within 14 days from the date
            of receiving the order.
            <br />
            <br />
            Product Condition: The product must be unused, in its original
            condition, and with all its accessories and packaging.
            <br />
            <br />
            Shipping Fees: The customer is responsible for all shipping costs
            related to the return.
            <br />
            <br />
          </p>
        </div>
        <div className="w-full max-w-4xl mx-auto font-archivo">
          <h3 className="text-2xl font-bold text-center">Exchange Policy:</h3>
          <p className="text-lg font-normal text-center md:text-base text-gray-600">
            <br />
            <br />
            Exchange Period: You can request an exchange within 14 days from the
            date of receiving the order.
            <br />
            <br />
            Product Condition: The product must be unused, in its original
            condition, and with all its accessories and packaging.
            <br />
            <br />
            Shipping Fees: The customer is responsible for all shipping costs
            related to the exchange.
            <br />
            <br />
            Exchanges for Defective Products: If you receive a product with a
            manufacturing defect, we will cover the shipping costs to replace
            the product.
            <br />
            <br />
          </p>
        </div>
        <div className="w-full max-w-4xl mx-auto font-archivo">
          <h3 className="text-2xl font-bold text-center">
            Return and Exchange Process:
          </h3>
          <p className="text-lg font-normal text-center md:text-base text-gray-600">
            <br />
            <br />
            Order Processing: Once we receive and inspect the product, we will
            process the return or exchange within 7 working days.
            <br />
            <br />
            Refund: The refund will be issued to the original payment method
            used at the time of purchase, after deducting any applicable
            shipping fees.
            <br />
            <br />
          </p>
        </div>
        <div className="w-full max-w-4xl mx-auto font-archivo">
          <h3 className="text-2xl font-bold text-center">Exceptions:</h3>
          <p className="text-lg font-normal text-center md:text-base text-gray-600">
            <br />
            <br />
            Returns or exchanges are not accepted on custom or modified products
            as per customer requests.
            <br />
            <br />
            Products purchased during special promotions may be subject to
            different return or exchange policies, which will be clarified at
            the time of the offer.
            <br />
            <br />
            Please make sure to read the terms and conditions carefully before
            submitting a return or exchange request. We are here to serve you
            and ensure your complete satisfaction with your experience at{" "}
            <Link
              className="text-blue-500 hover:underline hover:text-black "
              to={"/"}
            >
              Xeon
            </Link>
            .
            <br />
            <br />
          </p>
        </div>
      </div>
    </>
  );
};

export default RefundPolicyPage;
