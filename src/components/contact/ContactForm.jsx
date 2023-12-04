import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // eslint gives error for global process variable saying it is not defined
  /* eslint-disable no-undef */
  const emailAPI = process.env.NEXT_PUBLIC_EMAIL_JS_REST_API;
  const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID_FOR_EMAIL;
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID_FOR_EMAIL;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY_FOR_EMAIL;
  /* eslint-enable no-undef */

  const handleSubmit = async (e) => {
    e.preventDefault();

    var data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: name,
        from_email: email,
        to_name: "AI Research For Good",
        message: message,
      },
    };

    // send the email with the library provided rest api
    try {
      await axios.post(emailAPI, data);
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Email sent");
    } catch (error) {
      console.log(error);
      toast.error("Error sending email");
    }
  };

  return (
    <div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="form-inner">
              <input
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-inner">
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-inner">
              <textarea
                rows={5}
                placeholder="Enter Your Messege"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="eg-btn btn--primary btn--lg">
              Send Message
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
