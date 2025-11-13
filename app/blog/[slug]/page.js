import { notFound } from "next/navigation";
import { apiRequest } from "@/lib/laravel";
import Link from "next/link";
import ContactForm from "/components/ContactForm";

import "../../css/blog.css";

async function getBlogData(slug) {
  try {
      const url = `blogs/${slug}`;
     const data = await apiRequest(url);

    if (!data.status) return null;
    return data.blog;
  } catch (error) {
    console.error("Blog fetch error:", error);
    return null;
  }
}

/**
 * 🌐 Step 2: Dynamic Metadata from API
 */
export async function generateMetadata({ params }) {
    const { slug } = await params; // ✅ await params
  const blog = await getBlogData(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Daya Tour and Travels",
      description: "Sorry, this blog does not exist.",
    };
  }

  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.short_description,
    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.short_description
    },
  };
}

/**
 * 🧾 Step 3: Page Component
 */
export default async function BlogPage({ params }) {
  const { slug } = await params; // ✅ await params

  const blog = await getBlogData(slug);
  if (!blog) notFound();


  const latest_blogs = blog.latest_blogs;

  return (	<div className="blog-mid-page"><div className="blog-detail-page py-4">
    <div className="container py-5">
       <div className="row"><div className="col-8 blog-list-wrap blog-detail-page">
               <h1 className="blog-item-heading">{blog.title}</h1>
								<span className="blog-item-date">{blog.created_at}</span>

                <figure className="blog-img d-block"><img src={blog.image} alt={blog.title} />
								</figure>

                    <div className="blog_content"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                    />

        <Link href="/blog" className="btn btn-outline-secondary mb-3">
        &larr; Back to Blogs
      </Link>


       </div>
    <div className="col-4">

     <aside className="latest-blogs p-3 bg-white rounded-3 shadow-sm">
      <h5 className="fw-bold mb-3 border-bottom pb-2 text-primary">Latest Blogs</h5>
      <div className="list-group list-group-flush">
        {latest_blogs.map((bloglatest) => (
          <div
            className="d-flex align-items-center mb-3 pb-3 border-bottom"
            key={bloglatest.slug}
          >
            <Link href={`/blog/${bloglatest.slug}`} className="me-3 flex-shrink-0">
              <img
                src={bloglatest.image}
                alt={bloglatest.title}
                className="rounded-3"
                style={{ width: "90px", height: "70px", objectFit: "cover" }}
              />
            </Link>
            <div className="flex-grow-1">
              <Link
                href={`/blog/${bloglatest.slug}`}
                className="text-decoration-none fw-semibold text-dark d-block"
              >
                {bloglatest.title}
              </Link>
              <small className="text-muted">{bloglatest.date}</small>
            </div>
          </div>
        ))}
      </div>
    </aside>

      <ContactForm title="Get in Touch" formType="blog_page" />
    </div>
    </div>
    </div></div></div>
  );
}
