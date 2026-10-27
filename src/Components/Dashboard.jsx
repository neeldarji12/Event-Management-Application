function Dashboard({ counts, selectedStatus, onSelectStatus }) {
  const cards = [
    {
      title: "Total Events",
      count: counts.total,
      icon: "▦",
      className: "total",
      status: "All",
      description: "Click to view all events",
    },
    {
      title: "Upcoming Events",
      count: counts.upcoming,
      icon: "◷",
      className: "upcoming",
      status: "Upcoming",
      description: "Click to view upcoming",
    },
    {
      title: "Completed Events",
      count: counts.completed,
      icon: "✓",
      className: "completed",
      status: "Completed",
      description: "Click to view completed",
    },
    {
      title: "Cancelled Events",
      count: counts.cancelled,
      icon: "×",
      className: "cancelled",
      status: "Cancelled",
      description: "Click to view cancelled",
    },
  ];

  return (
    <section className="dashboard-grid">
      {cards.map((card) => {
        const isActive = selectedStatus === card.status;

        return (
          <button
            type="button"
            className={`dashboard-card ${isActive ? "active" : ""}`}
            key={card.className}
            onClick={() => onSelectStatus && onSelectStatus(card.status)}
            aria-label={`${card.title}: ${card.count}. ${card.description}`}
          >
            <div className="dashboard-card-top">
              <span className="dashboard-title">
                {card.title}
              </span>

              <span className={`dashboard-icon ${card.className}`}>
                {card.icon}
              </span>
            </div>

            <h3>{card.count}</h3>

            <p>{card.description} →</p>
          </button>
        );
      })}
    </section>
  );
}

export default Dashboard;
