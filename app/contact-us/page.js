import ContactForm from "/components/ContactForm";

export default function ContactUsPage() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <ContactForm title="Get in Touch" formType="contact_us" />
        </div>
      </div>
    </div>
  );
}
