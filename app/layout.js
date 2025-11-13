
import "./bootstrap.min.css";
import "./globals.css";
import Script from "next/script";
import HeaderClient from "@/components/HeaderClient";


export const metadata = {
  title: "Tajways",
  description: "Tajways",
};
let settings = {};

async function getAppSettings() {
try {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/settings`, { cache: 'no-store' });
  const data = await res.json();
  return data.data;
} catch (err) {
  console.error('Error fetching settings:', err);
}

}

export default async function RootLayout({ children }) {

settings = await getAppSettings();



  return (
    <html lang="en">
		<head>
        {/* Google Font (e.g., Poppins) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
       
      </head>
      <body cz-shortcut-listen="true">
        <div className="main-wrap">			
          <div className="header">

			<HeaderClient settings={settings} />

		</div>
          {children}
    
 <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
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
							<a href="#" className="fb-icon"><img src="/images/fb.svg" /></a>
							<a href="#" className="fb-icon"><img src="/images/insta.svg" /></a>
							<a href="#" className="fb-icon"><img src="/images/pint.svg" /></a>
							<a href="#" className="fb-icon"><img src="/images/link.svg" /></a>
							<a href="#" className="fb-icon"><img src="/images/x.svg" /></a>
							<a href="#" className="fb-icon"><img src="/images/utube.svg" /></a>
						</div>
					</div>
					
				</div>
			</div>
			<div className="copyright-txt text-center">
				<div className="container">
					© {new Date().getFullYear()}  Tajwaycabs All Rights Reserved.
				</div>
			</div>
		</div> 
        </div>
		
      </body>
    </html>
  );
}
