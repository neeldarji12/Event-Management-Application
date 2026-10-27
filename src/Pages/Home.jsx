import React, { useState, useEffect, useMemo } from 'react'

import Dashboard from "../Components/Dashboard";
import EventForm from "../Components/EventForm";
import EventList from "../Components/EventList";
import EventFilters from "../Components/EventFilters";

const STORAGE_KEY = "events";

// Default event data for optional loading
function getSampleEvents() {
  const today = new Date();

  function dateFromToday(offset) {
    const date = new Date(today);
    date.setDate(date.getDate() + offset);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return [
    {
      id: crypto.randomUUID(),
      title: "React Workshop",
      description: "Learn React fundamentals and component design.",
      date: dateFromToday(5),
      time: "10:00",
      location: "Ahmedabad",
      status: "Upcoming",
    },
    {
      id: crypto.randomUUID(),
      title: "JavaScript Training",
      description: "Practice JavaScript concepts and logic building.",
      date: dateFromToday(10),
      time: "14:00",
      location: "Training Room A",
      status: "Upcoming",
    },
    {
      id: crypto.randomUUID(),
      title: "Frontend Development Seminar",
      description: "An introduction to modern frontend development.",
      date: dateFromToday(-10),
      time: "11:00",
      location: "Conference Hall",
      status: "Completed",
    },
    {
      id: crypto.randomUUID(),
      title: "Team Meeting",
      description: "Discuss project progress and upcoming work.",
      date: dateFromToday(15),
      time: "16:00",
      location: "Office Meeting Room",
      status: "Cancelled",
    },
    {
      id: crypto.randomUUID(),
      title: "Web Design Session",
      description: "Discuss responsive design and CSS layouts.",
      date: dateFromToday(20),
      time: "09:30",
      location: "Ahmedabad",
      status: "Upcoming",
    },
  ];
}

// Load saved events from localStorage (default to empty list if none saved)
function loadEvents() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData !== null) {
      const parsedData = JSON.parse(savedData);

      if (Array.isArray(parsedData)) {
        return parsedData;
      }
    }
  } catch (error) {
    console.error("Error loading events:", error);
  }

  return [];
}

export default function Home() {
  // Main event state
  const [events, setEvents] = useState(loadEvents);

  // Form visibility and editing state
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Search, filter, and sorting state
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("earliest");

  // Save events whenever the events state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error("Error saving events:", error);

      window.alert(
        "Unable to save events. Please check your browser storage."
      );
    }
  }, [events]);

  // Calculate dashboard counts
  const counts = useMemo(() => {
    return {
      total: events.length,

      upcoming: events.filter(
        (event) => event.status === "Upcoming"
      ).length,

      completed: events.filter(
        (event) => event.status === "Completed"
      ).length,

      cancelled: events.filter(
        (event) => event.status === "Cancelled"
      ).length,
    };
  }, [events]);

  // Search, filter, and sort events
  const filteredEvents = useMemo(() => {
    let result = events.filter((event) =>
      event.title.toLowerCase().includes(search.trim().toLowerCase())
    );

    // Apply status filter
    if (selectedStatus !== "All") {
      result = result.filter(
        (event) => event.status === selectedStatus
      );
    }

    // Sort events by date
    result = [...result].sort((a, b) => {
      const comparison = a.date.localeCompare(b.date);

      return sortOrder === "earliest"
        ? comparison
        : -comparison;
    });

    return result;
  }, [events, search, selectedStatus, sortOrder]);

  // Open form to create a new event
  function handleAddEvent() {
    setEditingEvent(null);
    setShowForm(true);
  }

  // Open form to edit an existing event
  function handleEditEvent(event) {
    setEditingEvent(event);
    setShowForm(true);
  }

  // Create a new event or update an existing event
  function handleSaveEvent(eventData) {
    if (editingEvent) {
      // Update existing event
      setEvents((previousEvents) =>
        previousEvents.map((event) =>
          event.id === editingEvent.id
            ? { ...eventData, id: editingEvent.id }
            : event
        )
      );
    } else {
      // Add new event
      setEvents((previousEvents) => [
        ...previousEvents,
        {
          ...eventData,
          id: crypto.randomUUID(),
        },
      ]);
    }

    setShowForm(false);
    setEditingEvent(null);
  }

  // Delete an event
  function handleDeleteEvent(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    setEvents((previousEvents) =>
      previousEvents.filter((event) => event.id !== id)
    );

    // Close the form if the deleted event was being edited
    if (editingEvent?.id === id) {
      setShowForm(false);
      setEditingEvent(null);
    }
  }

  // Update event status
  function handleStatusChange(id, status) {
    setEvents((previousEvents) =>
      previousEvents.map((event) =>
        event.id === id
          ? { ...event, status }
          : event
      )
    );
  }

  // Reset search, status, and sorting
  function handleClearFilters() {
    setSearch("");
    setSelectedStatus("All");
    setSortOrder("earliest");
  }

  // Close the form
  function handleCancelForm() {
    setShowForm(false);
    setEditingEvent(null);
  }

  // Filter by status from dashboard click and smoothly navigate to events list
  function handleSelectStatus(status) {
    setSelectedStatus(status);
    const element = document.getElementById("events-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Clear all events
  function handleClearAllEvents() {
    const confirmed = window.confirm(
      "Are you sure you want to clear all events?"
    );

    if (!confirmed) {
      return;
    }

    setEvents([]);
  }

  // Load sample events
  function handleLoadSamples() {
    setEvents(getSampleEvents());
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">A</div>

          <div>
            <h1>APPLEN SOLUTIONS</h1>
            <p>Event Management Application</p>
          </div>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={handleAddEvent}
        >
          + Create Event
        </button>
      </header>

      <section className="welcome-section">
        <div>
          <p className="eyebrow">EVENT MANAGEMENT</p>

          <h2>Manage your events</h2>

          <p className="welcome-text">
            Create, organize, and track all your events in one place.
          </p>
        </div>
      </section>

      <Dashboard
        counts={counts}
        selectedStatus={selectedStatus}
        onSelectStatus={handleSelectStatus}
      />

      {showForm && (
        <EventForm
          initialEvent={editingEvent}
          onSave={handleSaveEvent}
          onCancel={handleCancelForm}
        />
      )}

      <EventFilters
        search={search}
        setSearch={setSearch}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onClear={handleClearFilters}
      />

      <EventList
        events={filteredEvents}
        totalEvents={events.length}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
        onStatusChange={handleStatusChange}
        onCreate={handleAddEvent}
        onClearAll={handleClearAllEvents}
        onLoadSamples={handleLoadSamples}
      />

      <footer className="app-footer">
        <p>APPLEN SOLUTIONS · Event Management Application</p>
      </footer>
    </main>
  );
}
