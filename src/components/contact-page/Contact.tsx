import { useState } from "react";
import React from "react";
import "./Contact.css";
import { db } from "../../firestore-config";
import { addDoc, collection } from "@firebase/firestore";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    fritext: "",
  });

  const contactCollectionRef = collection(db, "contacts");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    console.log(formData);
    addDoc(contactCollectionRef, {
      name: formData.name,
      email: formData.email,
      text: formData.fritext,
    });
    console.log(formData);
    alert("Message has been sent!");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setFormData({ ...formData, [name]: event.target.value });
  };

  const handleChangeArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name } = event.target;
    setFormData({ ...formData, [name]: event.target.value });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "10px" }} className="hero">
          <h1
            style={{
              color: "black",
              margin: 0,
              marginLeft: 30,
              fontFamily: "Style Script",
              fontSize: 60,
              textAlign: "center",
            }}
          >
            Contact Us
          </h1>
        </div>
      </div>
      <div className="form-div">
        <div
          style={{
            backgroundColor: "rgb(207, 205, 203)",
            boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.3)",
            padding: "20px 50px",
            width: "50%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            borderRadius: "0.5em",
          }}
        >
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              style={{
                border: "none",
                boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
                padding: "2%",
                backgroundColor: "white",
              }}
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              style={{
                border: "none",
                boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
                padding: "2%",
                backgroundColor: "white",
              }}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="fritext">Message:</label>
            <textarea
              style={{
                border: "none",
                boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
                padding: "2%",
                backgroundColor: "white",
              }}
              name="fritext"
              id="fritext"
              value={formData.fritext}
              placeholder="Type your message.."
              onChange={handleChangeArea}
              maxLength={500}
            />
            <button
              style={{
                border: "none",
                boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
                marginTop: "5px",
                padding: "2%",
                borderRadius: "5px",
                backgroundColor: "black",
                color: "white",
                fontSize: "14px",
              }}
              className="buyButton"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
