import EventCard from "./EventCard";

function EventList({
  events,
  totalEvents,
  onEdit,
  onDelete,
  onStatusChange,
  onCreate,
  onClearAll,
  onLoadSamples,
}) {
  return (
    <section className="events-section" id="events-section">
      <div className="section-heading">
        <div>
          <h2>All Events</h2>

          <p>
            {events.length}{" "}
            {events.length === 1 ? "event" : "events"} displayed
          </p>
        </div>

        {totalEvents > 0 && onClearAll && (
          <button
            type="button"
            className="clear-button"
            onClick={onClearAll}
          >
            Clear All Events
          </button>
        )}
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">▦</div>

          {totalEvents === 0 ? (
            <>
              <h3>No events yet</h3>

              <p>
                Create your first event to start organizing your schedule.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                <button
                  type="button"
                  className="primary-button"
                  onClick={onCreate}
                >
                  + Create Your First Event
                </button>
                {onLoadSamples && (
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={onLoadSamples}
                  >
                    Load Sample Events
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <h3>No matching events</h3>

              <p>
                Try changing your search or status filters.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default EventList;
