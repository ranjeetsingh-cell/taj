"use client";
import { useState } from "react";
  const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default function CallBack({passData }) {
  const [formData, setFormData] = useState({
      mobile: "",
      message: "",
      from_city:passData.from_city,
      to_city:passData.to_city
     
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
      const res = await fetch(`${NEXT_PUBLIC_SITE_URL}api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: data.message || "Message sent successfully!" });
        setFormData({
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
<div className="contact-pickup-form  box-shadow-wrap">	<div className="contact-pickup-form-inner">
        <h2 className="contact-pickup-heading">Request a Call Back</h2>


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
            <label className="form-label">Mobile</label>
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
            <label></label>
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
