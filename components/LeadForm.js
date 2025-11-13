"use client";
import { useState } from "react";
  
/*

{"name":"Ranjeet Singh111","email":"ranjeet180@gmail.com","mobile":"7973826133","from_city_id":"390","from_city":"Chandigarh","to_city":"Chandigarh","pick_date":"2025-10-30","trip_type":"oneway","message":"test","return_date":null}           
*/

export default function LeadForm({ title = "Contact Us", passData }) {
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      mobile: passData.mobile,
      message: "",
      trip_type:passData.trip_type,
      from_city:passData.from_city,
      to_city:passData.to_city || "NULL",
      from_city_id:passData.from_city_id || "NULL",
      pick_date:passData.pick_date,
      return_date:passData.return_date
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
      const res = await fetch("/api/lead", {
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
          mobile: "",
          message: ""         
        });
      } else {
        setStatus({ type: "error", message: data.errors || "Failed to send message." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }

    setLoading(false);
  };

  return (<div className="car-search-mid-area py-5"><div className="container">	
<div className="contact-pickup-form  box-shadow-wrap w-50 mx-auto p-3 text-center">	<div className="contact-pickup-form-inner">
        <h2 className="contact-pickup-heading">{title}</h2>

        <p>We’re sorry, but there are no cars available for your selected itinerary right now.</p>
<p>Please leave your contact details — our customer care team will call you soon to help arrange the best travel solution for you.</p>

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
       
          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
            <label className="form-label">mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div className="form-group">
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

          <div className="form-group">
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
    </div></div></div>
  );
}
