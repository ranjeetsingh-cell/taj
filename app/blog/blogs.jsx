"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';


export default function BlogList() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

 const top_page = searchParams.get('page')||1;

  const fetchBlogs = async (page = 1) => {
  const res = await fetch(`/api/blogs?page=${page}`);
  const data = await res.json();

  setBlogs(data.blogs);
  setPage(data.current_page);
  setTotalPages(data.total_pages);
  };


  // Load first page on mount
  useEffect(() => {
    fetchBlogs(top_page);
  }, [top_page]);

 const handlePageChange = (newPage) => {
    fetchBlogs(newPage);
  };

  return (
    <div className="blog-mid-page"><div className="blog-home-page py-4"><div className="container">
     
    
						
      <div className="row">
        
        <div className="col-md-12 blog-list-wrap">
           		<h1 className="sidebar-heading">Travel Guide</h1>
        <div className="row">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-lg-4 blog-item">
            <div className="card h-100 shadow-sm border-0">
            <a href={`/blog/${blog.slug}`} className="blog-img d-block">  <img src={blog.image} className="blog-image" alt={blog.title} /></a>
              <div className="blog-item-cnt-wrap d-block">
                <span className="blog-item-date">{blog.date}</span>
               <Link href={`/blog/${blog.slug}`} className="blog-item-heading"> <h2 > {blog.title}</h2> </Link>
               
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
<nav aria-label="Page navigation example"> <ul className="pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
         <li className="page-item"  key={p}><Link
         
          href={`/blog?page=${p}`}
           onClick={() => handlePageChange(p)}
          className={`page-link ${
            p === page ? "active" : "bg-gray-200"
          }`}
        >
          {p}
        </Link></li>
      ))}
   </ul> </nav>

{/* Pagination */}
    

      </div>



  


       </div>
   </div> </div> </div>
  );
}
