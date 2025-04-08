import React, { useState } from 'react';
import Footer from './Footer.tsx';

function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('access_key', 'ef90b504-633f-49ab-a00e-2bc90ab868b0');

    const object = Object.fromEntries(formDataToSend);
    const json = JSON.stringify(object);

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log('Success', res);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#EDEDED] to-[#D9D9D9] rounded-b-3xl">
      <div className="min-h-screen flex justify-center p-8">
        <div className="w-full max-w-lg">
          <h2 className="text-6xl font-serif text-center mb-4">Contact us</h2>
          <p className="text-center font-inter leading-[24px] text-lg text-gray-600 mb-16">
            We'd love to hear from you! Whether you have questions, feedback, or business inquiries, feel free to reach out.
          </p>
          <form
            onSubmit={onSubmit}
            className="bg-white border border-[#dedede] p-8 border-[13px] border-transparent rounded-2xl backdrop-blur-sm"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-left text-gray-700 text-base font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="shadow appearance-none border border-[#AAAAAA] rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-base font-semibold mb-2 text-left "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="shadow appearance-none border border-[#AAAAAA] rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 text-base font-semibold mb-2 text-left "
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Message"
                className="shadow appearance-none border border-[#AAAAAA] rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required 
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-gradient-to-r from-[#5AC57B] to-[#15B146] w-full hover:bg-green-700 text-base text-white font-semibold font-inter py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          {isSubmitted && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg">
              <p className="text-center text-lg font-semibold mb-4">
                Thank you for your message!
              </p>
              <p className="text-center">We will get back to you soon.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full block mx-auto"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactForm;