
import { apiRequest } from "/lib/laravel";

import "../../css/booking.css";
import "../../css/cms.css";
import BookCabs from './BookCabs';

async function getPageData(slug) {
  try {
    const url = `seopages/${slug}`;
    const data = await apiRequest(url);

  if (!data.page) return null;
    return data;
  } catch (error) {
    console.error("Data fetch error:", error);
    return null;
  }
}



export async function generateMetadata({ params }) {
    const { slug } = await params; // ✅ await params
  const pageData = await getPageData(slug);

  if (!pageData) 
  { 
    return {
      title: "Page Not Found | Tajways Cabs",
      description: "Page Not Found | Tajways Cabs",
    };
  }
const page = pageData.page;
  return {
    title: page.meta_title || page.title,
    description: page.meta_description || page.short_description,
    openGraph: {
      title: page.meta_title || page.title,
      description: page.meta_description || page.short_description
    },
  };
}



// ✅ 3. Render page
export default async function DynamicPage({ params }) {
  const { slug } = await params; // ✅ await params
  const dataPage = await getPageData(slug);


if (!dataPage) {

     return ( 
    <div className="container text-center my-5">
      <h1>404</h1>
      <p>Sorry, the page you’re looking for does not exist.</p>
      <a href="/" className="btn btn-primary mt-3">
        Go Home
      </a>
    </div>
  );
  
}
  const pageData = dataPage.page;
  const settings = dataPage.settings;
  const cabs = dataPage.cabs;
  const faqs = dataPage.faqs;
  return (
    <main>

      <div className="pagination-wrap">
			<div className="container">
				<div className="pagination d-none d-md-block">
					<a href="/">Home</a>
					<span className="p-arrow"> &gt; </span>
					<span className="current-link"> {pageData.title} </span>
				</div>
			</div>
		</div>

      <div className="page-mid-cmn-area "><div className="container">
            


              <div className="row">
                    <div className="col-sm-5">
                    <img src={pageData.image} alt={pageData.title} />
                    </div>
                    <div className="col-sm-7 cms-content"> 
                        <h1 className="cms-page-heading">{pageData.title}</h1>
                        <div  dangerouslySetInnerHTML={{ __html: pageData.short_content }}/>
                       

                     </div> 
                 <div className="col-sm-12 cms-content">
                     
                  <div dangerouslySetInnerHTML={{ __html: pageData.page_content.top_right }}/>
                   <div  dangerouslySetInnerHTML={{ __html: pageData.page_content.second_content }}/>

                   <div  dangerouslySetInnerHTML={{ __html: pageData.content }}/>

                 </div>              
             

       <div className="col-sm-12 mt-4">

         <BookCabs pageData={pageData} />

        <h2 className="fw-bold mb-4 text-center">Our Cabs</h2>
        <div className="row mt-4 text-center cabData" >
        {cabs.map((cab) => (
        <div className="col-sm-3 mt-4" key={cab.id}>
        <div className="car-info-img-mobile">
        <img src={cab.image} className="round-image" width="90%" alt={cab.name} />
        </div>
        <h4>{cab.name}</h4>
        </div>
        ))}
        </div>

    </div>

  <div className="col-sm-12 cms-content">
 <div  dangerouslySetInnerHTML={{ __html: pageData.page_content.third_content }}/>
</div>

<section className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item mb-2" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>

  <div className="col-sm-12 cms-content">
 <div  dangerouslySetInnerHTML={{ __html: pageData.page_content.bottom_content }}/>
</div>

         <BookCabs pageData={pageData} />

                 

 </div> 

        </div>
      </div>
    </main>
  );

}
