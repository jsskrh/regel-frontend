const SampleRequests = () => {
  return (
    <section className="mb-40">
      <h2 className="mb-4 font-semibold text-2xl leading-7">Sample Requests</h2>

      <p className="mt-3.75">
        We provide sample API calls next to each method{" "}
        <a
          href="http://curl.haxx.se/"
          className="text-blue-600 hover:underline"
        >
          using cURL
        </a>
        . All you need to do is insert your specific parameters, and you can
        test the calls from the command line. See this tutorial on{" "}
        <a
          href="https://www.baeldung.com/curl-rest"
          className="text-blue-600 hover:underline"
        >
          using cURL with APIs
        </a>
        .
      </p>

      <p className="mt-3.75">
        You can also{" "}
        <a
          href="https://www.postman.com/downloads/"
          className="text-blue-600 hover:underline"
        >
          use Postman
        </a>{" "}
        if you aren't familiar with cURL. Postman is an easy to use API
        development and testing platform.
      </p>
    </section>
  );
};

export default SampleRequests;
