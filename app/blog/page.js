
import { Suspense } from 'react';
import "../css/blog.css";
import Blogs from './blogs';
import { apiRequest } from "@/lib/laravel";


async function getPage(id) {
  try {
     const url = `getmeta/${id}`;
     const data = await apiRequest(url);

    if (!data.status) return null;
    return data.meta;
  } catch (error) {
    console.error("Page fetch error:", error);
    return null;
  }
}


export async function generateMetadata() {

  const page = await getPage(2);

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

export default function BlogHome() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Blogs />
    </Suspense>
  );
}
