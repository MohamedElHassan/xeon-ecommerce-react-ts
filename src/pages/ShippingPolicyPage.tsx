import { Link } from "react-router-dom";

type Props = {};

const ShippingPolicyPage = (props: Props) => {
  return (
    <>
      <div className="flex justify-center items-center py-5 px-2 flex-col">
        <div className="text-center flex justify-center items-center flex-col gap-5 font-archivo mb-4">
          <h1 className="text-7xl md:text-6xl sm:text-5xl font-bold">
            Shipping Policy
          </h1>
          {/* <p className="font-extralight text-base max-w-xl">
    Here you can check the size of your Hobbie to fit exactly your body.😁
  </p> */}
        </div>
        {/* Content Here */}

        {/* Block of Content */}
        <div className="w-full max-w-4xl mx-auto font-archivo">
          <p className="text-lg font-normal text-center md:text-base text-gray-600">
            <br />
            <br />
            At XEON, we strive to ensure your orders arrive as quickly as
            possible and with the best quality. Here are the details of our
            shipping policy:
            <br />
            <br />
            Shipping Time: Orders are processed and shipped within 4-5 business
            days from the order confirmation date.
            <br />
            <br />
            Business Days: Business days are counted from Saturday to Thursday.
            Friday is considered a holiday, so shipments or deliveries will not
            be made on this day.
            <br />
            <br />
            Shipping Confirmation: Once your order is shipped, you will receive
            an email or WhatsApp message with the shipment details and tracking
            number.
            <br />
            <br />
            Shipping Companies: We collaborate with trusted shipping companies
            to ensure fast and secure delivery.
            <br />
            <br />
            If you have any inquiries regarding the shipping process or order
            tracking, please feel free to contact us via{" "}
            <Link
              className="text-blue-500 hover:underline hover:text-black "
              to={"/contact"}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Contact Us Page
            </Link>
            .
            <br />
            <br />
            We are here to ensure a smooth and outstanding shopping experience
            for you!
            <br />
            <br />
          </p>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicyPage;
