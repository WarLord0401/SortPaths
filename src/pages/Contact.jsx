import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    emailjs
      .send(
        "service_mwi2km9",
        "template_wdhmxlq",
        {
          from_name: form.name,
          to_name: "Kanishk",
          from_email: form.email,
          to_email: "kanishkteotia5077@gmail.com",
          message: form.message,
        },
        "9qOAHJXp7YrBnEAXU"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Something went wrong!");
        }
      );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl"
      >
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-blue-500 mb-2">
            Contact Form
          </h2>
          <p className="text-gray-500">
            I would love to hear from you! Fill out the form below.
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Message Textarea */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Your Message
            </label>
            <textarea
              rows="5"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here"
              className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className={`bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold transition-all hover:bg-blue-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
