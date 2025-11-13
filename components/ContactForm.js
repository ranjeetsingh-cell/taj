"use client";
import { useState } from "react";

export default function ContactForm({ title = "Contact Us", formType = "contact_us" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    form_type: formType,
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: data.message || "Message sent successfully!" });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          form_type: formType,
        });
      } else {
        setStatus({ type: "error", message: data.message || "Failed to send message." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }

    setLoading(false);
  };

  return (
    <div className="card shadow-lg border-0 rounded-3 my-4">
      <div className="card-body p-4">
        <h2 className=" mb-4 text-left h4">{title}</h2>

         {status.message && (
          <div
            className={`alert mt-4 ${
              status.type === "success" ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-control"
              placeholder="Write your message"
              rows="4"
              required
            />
          </div>

          <input type="hidden" name="form_type" value={formData.form_type} />

          <div className="d-grid">
            <button
              type="submit"
              className="cmn-btn d-inline-block"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>

       
      </div>
    </div>
  );
}
