function EventFilters({
  search,
  setSearch,
  selectedStatus,
  setSelectedStatus,
  sortOrder,
  setSortOrder,
  onClear,
}) {
  const hasActiveFilters =
    search !== "" ||
    selectedStatus !== "All" ||
    sortOrder !== "earliest";

  return (
    <section className="filters-panel">
      <div className="filters-heading">
        <div>
          <h2>Find Events</h2>
          <p>Search, filter, and organize your events.</p>
        </div>

        <button
          className="clear-button"
          onClick={onClear}
          disabled={!hasActiveFilters}
        >
          Clear Filters
        </button>
      </div>

      <div className="filters-grid">
        <div className="form-group search-group">
          <label htmlFor="search">Search Events</label>

          <input
            id="search"
            type="search"
            placeholder="Search by event title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status-filter">
            Filter by Status
          </label>

          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sort-order">Sort by Date</label>

          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="earliest">Earliest First</option>
            <option value="latest">Latest First</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default EventFilters;