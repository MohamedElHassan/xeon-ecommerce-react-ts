import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center py-5 px-2 flex-col">
        <div className="text-center flex justify-center items-center flex-col gap-5 font-archivo mb-4">
          <h1 className="text-7xl md:text-6xl sm:text-5xl font-bold">
            Contact
          </h1>
          {/* <p className="font-extralight text-base max-w-xl">
        Here you can check the size of your Hobbie to fit exactly your body.😁
      </p> */}
        </div>
        {/* Content Here */}
      </div>
    </>
  );
};

export default ContactPage;

