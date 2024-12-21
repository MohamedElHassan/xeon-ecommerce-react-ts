import { Button } from "@/components/ui/button";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-archivo">
        <div className="text-center p-8 bg-white rounded-lg shadow-md space-y-2">
          <h1 className="text-6xl md:text-4xl font-bold text-black mb-4">
            Oops!
          </h1>
          <p className="text-xl mb-2">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-gray-600">
            <i>
              {error.status} - {error.statusText}
            </i>
          </p>
          <br />
          <Link to="/">
            <Button className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-archivo">
      <div className="text-center p-8 bg-white rounded-lg shadow-md space-y-2">
        <h1 className="text-6xl md:text-4xl font-bold text-black mb-4">
          Oops!
        </h1>
        <p className="text-xl mb-2">Sorry, an unexpected error has occurred.</p>
        <p className="text-gray-600">
          <i>Unknown Error</i>
        </p>
        <br />
        <Link to="/">
          <Button className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
