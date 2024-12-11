import React from "react";


const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
      // style={{
      //   backgroundImage: `url('${images.habiboHeroSectionImg}')`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "100% 100%",
      //   zIndex: 1,
      // }}
      // h-screen md:h-[600px] sm:h-[400px]
      className=" w-screen relative section-img min-h-screen md:h-[600px] sm:h-[400px] flex flex-col items-center justify-center text-center">
        {/* Commented the title and description and cta */}
        {/* <h1 className="text-3xl sm:text-4xl font-extrabold uppercase z-10">
          Premium Hoodies for Every Style
        </h1>
        <p className="mt-4 max-w-lg text-sm sm:text-base z-10">
          Discover the perfect blend of comfort and style. Shop our exclusive
          hoodie collection now.
        </p>
        <Link className="z-10" to="/products">
          <Button className="mt-6 rounded-sm" size="lg">
            Shop Now
          </Button>
        </Link> */}
        {/* <div className="absolute top-0 left-0 w-full h-full bg-slate-800 opacity-50 blur-sm"></div> */}
      </section>
      {/* <section className="relative rounded-lg bg-accent p-6 sm:p-8 mb-12 overflow-hidden">
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase z-10">
          Premium Hoodies for Every Style
        </h1>
        <p className="mt-4 max-w-lg text-sm sm:text-base z-10">
          Discover the perfect blend of comfort and style. Shop our exclusive
          hoodie collection now.
        </p>
        <Link to="/products">
          <Button size="lg" className="mt-6 z-10">
            Shop Now
          </Button>
        </Link>
        <div className="absolute top-0 left-0 w-full h-full bg-slate-800 opacity-50 blur-sm"></div>
      </section> */}

      {/* Featured Products Section */}
      {/* <section className="px-6 py-4">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section> */}
      {/* Newsletter Section */}
      {/* <section className="py-12 sm:py-16 px-4 sm:px-8 bg-muted text-center">
        <h2 className="text-xl sm:text-2xl font-bold">Join Our Newsletter</h2>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Stay updated with the latest deals and styles.
        </p>
        <form className="mt-6 flex flex-col sm:flex-row justify-center items-center">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full max-w-md mb-4 sm:mb-0 sm:mr-4"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </section> */}
    </div>
  );
};

export default HomePage;
