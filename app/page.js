import { apiRequest } from "/lib/laravel";
import Search from "../components/Search";


async function getPage() {
  try {
      const url = `gethome`;
     const data = await apiRequest(url);

    if (!data.status) return null;
    return data.meta;
  } catch (error) {
    console.error("Page fetch error:", error);
    return null;
  }
}


export async function generateMetadata() {

  const page = await getPage(1);

  if (!page) {
	return {
	  title: "Page Not Found",
	  description: "Page Not Found",
	};
  }

  return {
	title: page.meta_title || page.title,
	description: page.meta_description || page.short_description,
	keywords: page.meta_keywords,
	alternates: {
    canonical: page.canonical,
  },
	openGraph: {
	  title: page.meta_title || page.title,
	  description: page.meta_description || page.short_description
	},
  };
}




export default async function Home() {

const pageData = await getPage();
const servicesData = pageData.our_services;
const services = servicesData.services || [];

  return (
    <div>
			<div className="banner-wrap"><div className="bnr-bg-form-wrap">
			<h1>{pageData.page_title}</h1>
			<Search />
			</div></div>
		
		<div className="why-us-wrap top-btm-space">
			
			<div className="container">
				<div className="cmn-heading">Why book on Tajwaycabs?</div>
				<div className="why-us-items-wrap">
					<div className="why-icon-item">
						<span className="w-icon"><img src="images/price-transparecy.svg" /></span>
						<span className="w-txt">Price <span className="d-block">Transparency</span></span>
					</div>
					<div className="why-icon-item">
						<span className="w-icon"><img src="images/24-7.svg" /></span>
						<span className="w-txt">24x7  <span className="d-block">Service</span></span>
					</div>
					<div className="why-icon-item">
						<span className="w-icon"><img src="images/zero-cancel.svg" /></span>
						<span className="w-txt">Zero <span className="d-block">Cancellation</span></span>
					</div>
					<div className="why-icon-item">
						<span className="w-icon"><img src="images/clean-hygienic.svg" /></span>
						<span className="w-txt">Clean and<span className="d-block">Hygienic Car </span></span>
					</div>
				</div>
			</div>
			
		</div>


		    {services.length > 0 && (
		
		<div className="service-full-wrap top-btm-space">
			
			<div className="container">
				<div className="cmn-heading">{servicesData.title}</div>
				<div className=" service-items-wrap">

				{services.map((service, index) => (
					<div key={index} className="service-item">
						<div className="service-img"><img src={service.image} alt={service.title} /></div>
						<div className="service-cont">
							<h3 className="service-heading">{service.title}</h3>
							<p className="service-info">{service.content}</p>
						</div>
					</div>
				)) }

				
					
				</div>
			</div>
			
		</div>
     )}  

			
		<div className="about-wrap top-btm-space">
			<div className="container">
				<div className="about-inner-wrap">
					
					<div className="about-cont-item">
						<h2 className="cmn-heading text-start">{pageData.about_title}</h2>
						
							<div className="blog_content"
							dangerouslySetInnerHTML={{ __html: pageData.short_content }}
							/>
					</div>
					
					<div className="about-img">
						<img src="images/about-bnr.jpg" />
					</div>
					
				</div>
			</div>
		</div>
		
		<div className="vision-mission-wrap">
			<div className="container">
				<div className="vision-mission-inner">
					<h2 className="cmn-heading text-start">{pageData.vision_mission}</h2>
					<div className="vm-cont">
						<div className="blog_content"
							dangerouslySetInnerHTML={{ __html: pageData.content }}
							/>
					</div>
				</div>
			</div>
		</div>
    </div>
  );
}
