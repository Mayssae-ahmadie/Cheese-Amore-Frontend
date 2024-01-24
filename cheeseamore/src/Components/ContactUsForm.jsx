import "../CSS/ContactUsForm.css";
import { useForm } from "@formspree/react";
import { useState } from "react";

function ContactUsForm() {
  const [state, handleSubmit] = useForm("mdoqannl");
  const [showThanksMessage, setShowThanksMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setFormData({ name: "", email: "", message: "" });
    setShowThanksMessage(true);
  };

  const closeModal = () => {
    setShowThanksMessage(false);
  };

  return (
    <div className="  mx-40 mt-40 contactUsDescription-cont ">
      <p className="mt-40 text-3xl text-center underline contactUsTitle">
        GET IN TOUCH
      </p>
      <div className="text-center">
        <form className="py-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
              required
            />
            <span className="mx-4 contactUsDescription-span"></span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-mail"
              className="md:mt-0 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
              required
            />
          </div>
          <textarea
            className="resize-none w-full px-4 py-2 h-32 bg-gray-100 focus:outline-none text-lg text-black"
            placeholder="Your message..."
            value={formData.message}
            onChange={handleInputChange}
            name="message"
            required
          ></textarea>
          <button
            className="bg-[#E6C068] text-black-700 font-bold py-2 px-6 text-lg inline-block mt-5 flex ml-auto justify-center "
            disabled={state.submitting}
            type="submit"
          >
            SEND
          </button>
        </form>
        {state.succeeded && showThanksMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 relative z-10 w-96">
              <div className="  flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl m-12 w-2/3 mx-auto">
                    Thank you for contacting us!
                    <br />
                    We will get back to you shortly.
                  </p>
                  <div className="flex justify-end bg-gray-100 p-6 items-center">
                    <button
                      onClick={closeModal}
                      className="bg-[#E6C068] text-white font-bold py-1 px-2 w-32 text-lg inline-block " >
                      CANCEL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactUsForm;