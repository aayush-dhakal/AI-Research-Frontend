import ContactForm from "@/components/contact/ContactForm";
import React from "react";

const contact = () => {
  return (
    <section className="contact-section pt-100 pb-100">
      <div className="container">
        <div className="row gy-4 justify-cotnent-center align-items-center">
          <div className="col-lg-5 pe-lg-5 pe-0">
            <div className="contact-box">
              <div className="title">
                <h3>Contact Us</h3>
                <div>We will get back to you soon.</div>
                <p className="mt-2">
                  <i className="bi bi-envelope-fill" />
                  <span
                    style={{
                      marginLeft: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    contact@airesearchforgood.org
                  </span>
                </p>
              </div>
              <div className="left-social">
                <ul>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/ai-research-for-good"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="bx bxl-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/airesearch4good"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="bx bxl-twitter" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/airesearchforgood"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="bx bxl-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="form-title">
              <h2>Send Us An Email</h2>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default contact;
