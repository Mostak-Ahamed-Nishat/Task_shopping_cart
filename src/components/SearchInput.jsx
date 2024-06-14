function SearchInput({ handleSearch }) {
  return (
    <form className="mx-auto w-2/4">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="w-full px-10 py-2 rounded-md focus:outline-none border-b-2"
          placeholder="Search by name"
          onChange={handleSearch}
        />
      </div>
    </form>
  );
}

export default SearchInput;
