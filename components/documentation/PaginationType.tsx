const PaginationType = () => {
  return (
    <section className="mb-20">
      <h2 className="mb-4 font-semibold text-2xl leading-7">Pagination Type</h2>
      <p className="mt-3.75">
        The Regel API uses <strong>Offset Pagination</strong>. You can control the
        results by passing <code>page</code> and <code>limit</code> as query parameters.
      </p>
      <ul className="list-disc pl-8 mt-4 space-y-2">
        <li>
          <code>page</code>: The page number you want to retrieve (starting from 1).
        </li>
        <li>
          <code>limit</code>: The number of records to return per page (e.g., 10, 20, 50).
        </li>
      </ul>
    </section>
  );
};

export default PaginationType;