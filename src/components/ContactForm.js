import React from "react";
import { useForm } from "../hooks/useForm";
import Loader from "../components/Loader";
import Message from "../components/Message";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  comments: "",
};
const validationForm = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexComments = /^.{1,255}$/;
  
    if (!form.name.trim()) {
      errors.name = "Field 'Name' is required";
    } else if (!regexName.test(form.name.trim())) {
      errors.name = "Field 'Name' just allow letters and blank spaces";
    }
  
    if (!form.email.trim()) {
      errors.email = "Field 'Email' is required";
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email = "Invalid Field 'Email'";
    }
  
    if (!form.subject.trim()) {
      errors.subject = "Field 'Subject' is required";
    }
  
    if (!form.comments.trim()) {
      errors.comments = "Field 'Comments' is required";
    } else if (!regexComments.test(form.comments.trim())) {
      errors.comments =
        "Field 'Comments' just allow 255 characters";
    }
  
    return errors;
};

let styles = {
  fontWeight: "bold",
  color: "#dc3545",
};

const ContactForm = () => {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationForm);

  return (
    <div>
      <h2>Contact form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Write your name"
          onChange={handleChange}
          value={form.name}
          required
          onBlur={handleBlur}
        />
        {errors.name && <p style={styles}>{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Write your email"
          onChange={handleChange}
          value={form.email}
          required
          onBlur={handleBlur}
        />
        {errors.email && <p style={styles}>{errors.email}</p>}
        <input
          type="text"
          name="subject"
          placeholder="Write your subject"
          onChange={handleChange}
          value={form.subject}
          required
          onBlur={handleBlur}
        />
        {errors.subject && <p style={styles}>{errors.subject}</p>}
        <textarea
          name="comments"
          cols="30"
          rows="5"
          placeholder="Write your comments"
          onChange={handleChange}
          value={form.comments}
          required
          onBlur={handleBlur}
        ></textarea>
        {errors.comments && <p style={styles}>{errors.comments}</p>}
        <input type="submit" value="Send" />
      </form>
      {loading && <Loader />}
      {response && <Message msg="Data sent" bgColor="#198754"/>}
    </div>
  );
};

export default ContactForm;
