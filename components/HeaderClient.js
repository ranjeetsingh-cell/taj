"use client";
import { useState } from "react";
export default function HeaderClient({settings}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);


const phoneNumber = `+91${settings.phone}`;
const telHref1 = `tel:${phoneNumber}`;

const phoneNumber2 = `+91${settings.phone2}`;
const telHref2 = `tel:${phoneNumber2}`;

  return (

<div className="container">
				<div className="header-inner">
					
					<a href="/" className="header-logo"><img src="/images/logo.svg" width="100" /></a>
					<div className="header-call mip-hide">
						<a href="tel:+919354860010" className="whtsapp-link"><span className="whts-icon icon-item"><img src="/images/whatsapp.svg" /></span> {settings.whatsapp}</a>
						<div className="call-wrap"><span className="call-icon icon-item"><img src="/images/call.svg" /></span>
							<a href={telHref1} className="call-link"> +91 {settings.phone}</a> , 
							<a href={telHref2} className="call-link"> +91 {settings.phone2}</a>
						</div>
					</div>
					<div className="header-links-item mip-hide">
						<a href={telHref1} className="cmn-btn border-btn">Call Us</a>
						<a href="/contact-us" className="cmn-btn">Contact Us</a>
					</div>
					
					<div className="mobile-header-right dil-hide header-links-item">
						<a href="tel:+919354860010" className="whtsapp-link"><img src="/images/m-whts-icon.svg" /></a>
						<a href="tel:+919354860010" className="call-link"><img src="/images/m-call-icon.svg" /></a>
					</div>
					
					<div className="sideMenu"><button id="openMenu"  onClick={handleOpen} className="ham-menu"><img src="/images/hamburger-menu.svg" /></button>
					</div>
					
				</div>
				
				<div  className={`navigation-wrap ${
					isOpen ? "open translate-x-0" : "-translate-x-full"
					}`} id="mobile-menu" >
					<ul className="main-menu">
						<li><a href="/">Home</a></li>
						<li><a href="/about">About us</a></li>
						<li><a href="/">Self-drive car service</a></li>
						<li><a href="/blog">Blog</a></li>
						<li><a href="/contact-us">Contact us</a></li>
						<li><a href="/terms-and-conditions">Terms & Conditions</a></li>
						<li><a href="/privacy-policy">Booking & Privacy Policy</a></li>
					</ul>
					<div className="sidemenu-social-icon">
						<h3 className="sidemenu-heading">Get in Touch</h3>
						<div className="social-icon ">
							<a href={settings.facebook} target="_blank" className="fb-icon"><img src="/images/fb.svg" /></a>
							<a href={settings.instagram} target="_blank" className="fb-icon"><img src="/images/insta.svg" /></a>
							<a href={settings.pinterest} target="_blank" className="fb-icon"><img src="/images/pint.svg" /></a>
							<a href={settings.linkedin} target="_blank" className="fb-icon"><img src="/images/link.svg" /></a>
							<a href={settings.twitter} target="_blank" className="fb-icon"><img src="/images/x.svg" /></a>
							<a href={settings.youtube} target="_blank" className="fb-icon"><img src="/images/utube.svg" /></a>
						</div>
					</div>
					<div className="close-menu" id="menuClose">
						<button className="cls-btn" type="button" onClick={handleClose} id="closeMenu"><span>X</span></button>
					</div>
					
				</div>				
			</div>

            );
}