

export async function generateMetadata() {
return {
      title: "222Page Not Found | Tajways Cabs",
      description: "Page Not Found | Tajways Cabs",
    };
}

export default function NotFound() {
  return (
    <div className="container text-center my-5">
      <h1>404-23</h1>
      <p>Sorry, the page you’re looking for does not exist.</p>
      <a href="/" className="btn btn-primary mt-3">
        Go Home
      </a>
    </div>
  );
}
