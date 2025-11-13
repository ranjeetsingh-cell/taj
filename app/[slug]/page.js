//import { notFound } from "next/navigation";
import { apiRequest } from "@/lib/laravel";
import "../css/cms.css";

async function getPageData(slug) {
  try {
    const url = `cmspage/${slug}`;
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
      description: page.meta_description || page.short_description,
      images: [page.meta_image || "/default.jpg"],
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


  return (
    <main>
      <div className="pagination-wrap">
			<div className="container">
				<div className="pagination d-none d-md-block">
					<a href="/">Home</a>
					<span className="p-arrow"> &gt; </span>
					<span className="current-link"> {pageData.title}</span>
				</div>
			</div>
		</div>
      <div className="page-mid-cmn-area">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="terms-cnt">
              <h1 className="cms-page-heading">{pageData.title}</h1>
             
                   <div
                    dangerouslySetInnerHTML={{ __html: pageData.content }}
                    />
              </div> 
            </div> 
          </div> 
        </div>
      </div>
    </main>
  );

}
