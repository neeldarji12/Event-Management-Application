function EventCard({ event, onEdit, onDelete, onStatusChange }) {
  const statusClass = event.status ? event.status.toLowerCase() : "upcoming";

  return (
    <article className="event-card">
      <div className="event-card-header">
        <div className="event-heading">
          <span className={`status-badge ${statusClass}`}>
            {event.status}
          </span>
          <h3>{event.title}</h3>
        </div>

        <div className="event-actions">
          <button
            type="button"
            className="text-button edit-button"
            onClick={() => onEdit(event)}
            aria-label={`Edit ${event.title}`}
          >
            Edit
          </button>

          <button
            type="button"
            className="text-button delete-button"
            onClick={() => onDelete(event.id)}
            aria-label={`Delete ${event.title}`}
          >
            Delete
          </button>
        </div>
      </div>

      <p className="event-description">
        {event.description || "No description provided."}
      </p>

      <div className="event-details">
        <div className="event-detail">
          <span className="detail-icon" aria-hidden="true">📅</span>
          <div>
            <span className="detail-label">Date</span>
            <p>{event.date}</p>
          </div>
        </div>

        <div className="event-detail">
          <span className="detail-icon" aria-hidden="true">⏰</span>
          <div>
            <span className="detail-label">Time</span>
            <p>{event.time}</p>
          </div>
        </div>

        <div className="event-detail">
          <span className="detail-icon" aria-hidden="true">📍</span>
          <div>
            <span className="detail-label">Location</span>
            <p>{event.location}</p>
          </div>
        </div>
      </div>

      <div className="event-card-footer">
        <label htmlFor={`status-${event.id}`}>Change Status</label>
        <select
          id={`status-${event.id}`}
          value={event.status}
          onChange={(e) => onStatusChange(event.id, e.target.value)}
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </article>
  );
}

export default EventCard;
