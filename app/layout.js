
import "./bootstrap.min.css";
import "./globals.css";
import Script from "next/script";
import HeaderClient from "/components/HeaderClient";
import FooterClient from "/components/FooterClient";

import { apiRequest } from "/lib/laravel";

export const metadata = {
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
};

async function getAppSettings() {
try {

const url = `settings`;
const data = await apiRequest(url);
console.log(data);
return data.data;

} catch (err) {
  console.error('Error fetching global set Data -RS :', err);
}

}

export default async function RootLayout({ children }) {

const settings = await getAppSettings();
/*
const settings = {
    "phone": "9999955712",
    "whatsapp": "9354860010",
    "customer_count": "3000",
    "facebook": "https://www.facebook.com/tajwaycabs",
    "instagram": "https://www.instagram.com/tajwaycabs",
    "twitter": "https://x.com/tajwaycabs",
    "linkedin": "https://www.linkedin.com/company/tajwaycabs",
    "phone2": "8800550676",
    "vehicles": "1000",
    "youtube": "https://www.youtube.com/channel/UCgoObBHSddqA0esdeqgE_LA",
    "email": "info@tajwaycabs.com"
};
*/

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


      
		<FooterClient settings={settings} />


		


        </div>
		
      </body>
    </html>
  );
}
