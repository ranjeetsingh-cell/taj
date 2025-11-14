"use client";
import { useState } from "react";

const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export default function FooterClient({settings}) {
	const [status, setStatus] = useState({ type: "", message: "" });
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({     
		mobile: ""
	});
  
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
			mobile: ""         
		  });
		} else {
		  setStatus({ type: "error", message: data.errors || "Failed to send message." });
		}
	  } catch (err) {
		setStatus({ type: "error", message: "Something went wrong. Please try again." });
	  }
  
	  setLoading(false);
	};

  const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
    setIsOpen(!isOpen); // Invert the state on click
  };


  const [isOffer, setIsOffer] = useState(false);
  const handleCloseOffer = () => setIsOffer(false);

  const handleOpenOffer = () => {
    setIsOffer(!isOffer); // Invert the state on click
  };

const phoneNumber = `+91${settings.phone}`;
const telHref1 = `tel:${phoneNumber}`;

const phoneNumber2 = `+91${settings.phone2}`;
const telHref2 = `tel:${phoneNumber2}`;

  return (
 <div className="main-footer-wrap">
			<div className="footer-info-wrap">
				<div className="container footer-info-inner">
					<div className="footer-links">
						<h3 className="footer-heading">Company</h3>
						<ul className="footer-list-items">
							<li><a href="/">Home</a></li>
							<li><a href="/about">About</a></li>
							<li><a href="/blog">Blog</a></li>
							<li><a href="/contact-us">Contact Us</a></li>
							<li><a href="/terms-and-conditions">Terms & Conditions </a></li>
							<li><a href="/privacy-policy">Booking & Privacy Policy  </a></li>
						</ul>
					</div>

					<div className="footer-links">
						<h3 className="footer-heading">Services</h3>
						<ul className="footer-list-items">
							<li><a href="/">Home</a></li>
							<li><a href="/about">About</a></li>
							<li><a href="/blog">Blog</a></li>
							<li><a href="/contact-us">Contact Us</a></li>
							<li><a href="/terms-and-conditions">Terms & Conditions </a></li>
							<li><a href="/privacy-policy">Booking & Privacy Policy  </a></li>
						</ul>
					</div>
					
					<div className="footer-links">
						<h3 className="footer-heading">Get in Touch</h3>
						<ul className="footer-list-items">
							
							<li><a href="tel:+918383927223">+91 8383 927 223</a> , <a href="tel:+918800765249">+91 8800 765 249</a></li>
							
							<li><a href="tel:+919315590845">+91 9315 590 845</a>, <a href="tel:+919999955712">+91 9999 955 712</a></li>
							
							<li><a href="tel:+918800550676">+91 8800 550 676</a>, <a href="tel:+918800550901">+91 8800 550 901</a></li>
							<li><a href="tel:+919354860010">+91 9354 860 010</a></li>
						</ul>
						<div className="social-icon">
							<a href={settings.facebook} target="_blank" className="fb-icon"><img src="/images/fb.svg" /></a>
							<a href={settings.instagram} target="_blank" className="fb-icon"><img src="/images/insta.svg" /></a>
							<a href={settings.pinterest} target="_blank" className="fb-icon"><img src="/images/pint.svg" /></a>
							<a href={settings.linkedin} target="_blank" className="fb-icon"><img src="/images/link.svg" /></a>
							<a href={settings.twitter} target="_blank" className="fb-icon"><img src="/images/x.svg" /></a>
							<a href={settings.youtube} target="_blank" className="fb-icon"><img src="/images/utube.svg" /></a>
						</div>
					</div>
					
				</div>
			</div>
			<div className="copyright-txt text-center">
				<div className="container">
					© {new Date().getFullYear()}  Tajwaycabs All Rights Reserved.
				</div>
			</div>


	<div className="header footer-fixed-item">
			<div className="container">
				<div className="header-inner">
					
					<div className="mobile-footer-btm dil-hide header-links-item footer-btm-fixed">
						<a href={telHref1} className="whtsapp-link"><img src="/images/m-whts-icon.svg" width="40" /><span>Whtsapp</span></a>
						<button onClick={handleOpen} className="call-link phone-popup-link"><img src="/images/m-call-icon.svg" width="40" /><span>Call Now</span></button>
						
						<div className={`phone-popup-wrap ${isOpen ? "d-block " : "d-md-none"}`} >
								<a href="tel:+918383927223" className="call-no">+91 8383 927 223</a>
								<a href="tel:+918800550676" className="call-no">+91 8800 550 676</a>
								<a href="tel:+918800765249" className="call-no">+91 8800 765 249</a>
								<a href="tel:+919315590845" className="call-no">+91 9315 590 845</a>
								<a href="tel:+919999955712" className="call-no">+91 9999 955 712</a>
								<a href="tel:+919354860010" className="call-no">+91 935 486 0010</a>
								<a href="tel:+918800550901" className="call-no">+91 880 055 0901</a>
						</div>
						
						<button onClick={handleOpenOffer} className="offer-m-btm"><img src="/images/special-offer.svg" width="40" /><span>Offer</span></button>
						<div className={`special-offer-wrap ${isOffer ? " offer-show " : " "}`} >
							<div className="special-offer-inner">
								<div className="sp-of-cont">
									<button onClick={handleCloseOffer} className="close-offer">+</button>
									<div className="offer-img"><img src="/images/special-offer.svg" width="70" /></div>
									<p className="offer-txt">20% OFF on Selected Ride Get Code</p>
									<div className="submit-form">
										<form onSubmit={handleSubmit}>
											<div className="form-group-custom">
												<label className="input-wrap">
													<span className="input-code">+91 - </span>
													<span className="input-label">Mobile No</span>
													<input value={formData.mobile} name="mobile" type="tel" className="form-control" placeholder="Enter 10 digit Mobile Number"  onChange={handleChange} />
												</label>
											</div>
											<div className="form-group-custom mt-3">
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

												<button  disabled={loading} type="submit" className="cmn-btn" >
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
														"Submit"
													)}
													</button>
																					</div>
										</form>
										<p className="process-text">By procedding, you agree to our's <a href="/privacy-policy">Privacy Policy</a>, and <a href="/terms-and-conditions">Terms and Service</a></p>
									</div>
								</div>
							</div>
						</div>
						
					</div>

				</div>
				
			</div>
		</div>



		</div> 

            );
}