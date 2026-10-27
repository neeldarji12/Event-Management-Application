import { useState } from "react";

const EMPTY_FORM = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  status: "Upcoming",
};

function getToday() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function EventForm({ initialEvent, onSave, onCancel }) {
  const [formData, setFormData] = useState(() => ({
    ...EMPTY_FORM,
    ...(initialEvent || {}),
  }));

  const [errors, setErrors] = useState({});

  // Update the field whose name matches the input name.
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Remove the error for the field being corrected.
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    const title = formData.title.trim();
    const location = formData.location.trim();
    const description = formData.description;

    if (title.length < 3) {
      newErrors.title =
        "Event title must contain at least 3 characters.";
    }

    if (description.length > 300) {
      newErrors.description =
        "Description cannot exceed 300 characters.";
    }

    if (!formData.date) {
      newErrors.date = "Please select an event date.";
    } else {
      const today = getToday();

      // New events cannot have a date in the past.
      if (!initialEvent && formData.date < today) {
        newErrors.date =
          "Event date cannot be in the past.";
      }

      // Existing historical dates may remain unchanged.
      if (
        initialEvent &&
        formData.date < today &&
        formData.date !== initialEvent.date
      ) {
        newErrors.date =
          "A past date can only be kept if it is the original event date.";
      }
    }

    if (!formData.time) {
      newErrors.time = "Please select an event time.";
    }

    if (!location) {
      newErrors.location = "Location is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
      status: formData.status || "Upcoming",
    });
  }

  return (
    <section className="form-panel" id="event-form">
      <div className="form-header">
        <div>
          <p className="eyebrow">
            {initialEvent ? "UPDATE EVENT" : "NEW EVENT"}
          </p>

          <h2>
            {initialEvent ? "Edit Event" : "Create New Event"}
          </h2>

          <p>
            Enter the details below to manage your event.
          </p>
        </div>

        <button
          type="button"
          className="icon-button"
          onClick={onCancel}
          aria-label="Close form"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="title">
              Event Title <span className="required">*</span>
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              maxLength={100}
              aria-invalid={Boolean(errors.title)}
            />

            {errors.title && (
              <small className="error-message">
                {errors.title}
              </small>
            )}
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Enter event description (optional)"
              value={formData.description}
              onChange={handleChange}
              maxLength={300}
              rows={3}
            />

            <div className="character-count">
              {formData.description.length}/300 characters
            </div>

            {errors.description && (
              <small className="error-message">
                {errors.description}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date">
              Event Date <span className="required">*</span>
            </label>

            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              min={
                !initialEvent ||
                formData.date >= getToday()
                  ? getToday()
                  : undefined
              }
              onChange={handleChange}
              aria-invalid={Boolean(errors.date)}
            />

            {errors.date && (
              <small className="error-message">
                {errors.date}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="time">
              Event Time <span className="required">*</span>
            </label>

            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              aria-invalid={Boolean(errors.time)}
            />

            {errors.time && (
              <small className="error-message">
                {errors.time}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location">
              Location <span className="required">*</span>
            </label>

            <input
              id="location"
              name="location"
              type="text"
              placeholder="Enter event location"
              value={formData.location}
              onChange={handleChange}
              aria-invalid={Boolean(errors.location)}
            />

            {errors.location && (
              <small className="error-message">
                {errors.location}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button type="submit" className="primary-button">
            {initialEvent ? "Save Changes" : "Create Event"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default EventForm;