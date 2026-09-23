import profilePhoto from '../assets/KimProfile.jpeg'
import { useState } from "react"

function About() {
  // Sets default state to empty
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitStatus, setSubmitStatus] = useState("")

  // Handles form submission to Formspree
  const handleSubmit = async (event) => {
    event.preventDefault()

    // Prevents invalid form submission
    if (!isFormValid) return

    try {
      const response = await fetch("https://formspree.io/f/xwlplbva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      })

      if (response.ok) {
        setSubmitMessage("Thanks! Your message has been submitted.")
        setSubmitStatus("success")

        // Clears form after successful submission
        setName("")
        setEmail("")
        setMessage("")
      } else {
        setSubmitMessage("Something went wrong. Please try again.")
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitMessage("Something went wrong. Please try again.")
      setSubmitStatus("error")
    }
  }

  // Checks email format using Regex
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Checks for valid name >= 3 characters
  const isValidName = (name) => {
    return name.trim().length >= 3
  }

  // Checks for valid message length >= 50 characters
  const isValidMessage = (message) => {
    return message.trim().length >= 50
  }

  // Confirms valid name, email, and message content
  const isFormValid =
    isValidName(name) &&
    isValidEmail(email) &&
    isValidMessage(message)

  return (
    <div className="page">
      <h1>About ReadyBoard</h1>

      <section className="card">
        <h2>What is ReadyBoard?</h2>
        <p>
          ReadyBoard is a lightweight change management tool designed to
          simplify how teams track and execute change requests.
        </p>
        <p>
          It focuses on clarity, speed, and usability—helping users quickly
          identify priorities without getting lost in complex systems.
        </p>
      </section>

      <section className="card">
        <h2>Who is it for?</h2>
        <ul>
          <li>Change Managers overseeing workflows</li>
          <li>Change Owners responsible for execution</li>
          <li>Teams that need better visibility into change activity</li>
        </ul>
      </section>

      <section className="card">
        <h2>Project Context</h2>
        <p>
          ReadyBoard was built as part of a full-stack development course to
          demonstrate a complete web application using React, JavaScript,
          Spring Boot, Java, and MySQL. The application includes reusable React
          components, client-side routing, form validation, asynchronous API
          integration, relational data, and full CRUD functionality for
          managing changes.
        </p>
        <p>
          Change data is persisted in a MySQL database and accessed through a
          REST API, allowing users to create, view, update, and delete changes
          while tracking ownership, assignment group, readiness status, and
          risk.
        </p>
      </section>

      <section className="card">
        <h2>About the Developer - Kim Hauser</h2>

        <div className="about-profile">
          <img
            src={profilePhoto}
            alt="Kim Hauser"
            className="about-image"
          />
        </div>

        <p>
          Hi, I’m Kim—an IT professional and member of LaunchCode's Women+
          Software Development cohort. I work with Microsoft 365 and Atlassian
          tools, helping teams navigate complex systems in ways that are clear
          and approachable.
        </p>

        <p>
          ReadyBoard grew out of that same interest in reducing friction and
          making operational work easier to understand. I designed and built
          the application as a full-stack change management tool focused on
          improving visibility into readiness, ownership, assignment groups,
          and risk.
        </p>

        <p>
          When I’m not working on technology or building my latest project, I
          recharge by reading and spending time outdoors.
        </p>
      </section>

      <section className="card">
        <h2>Contact Me</h2>
        <p>
          Have feedback, ideas, or just want to connect? I’d love to hear from
          you.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Name form items + event handler + validation */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={
                name && !isValidName(name) ? "input-invalid" : ""
              }
            />

            {name && !isValidName(name) && (
              <p className="validation-text">
                Name must be at least 3 characters.
              </p>
            )}
          </div>

          {/* Email form items + event handler + validation */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={
                email && !isValidEmail(email) ? "input-invalid" : ""
              }
            />

            {email && !isValidEmail(email) && (
              <p className="validation-text">
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* Message form items + event handler + character count validation */}
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={
                message && !isValidMessage(message) ? "input-invalid" : ""
              }
            />

            {message && !isValidMessage(message) && (
              <p className="character-count">
                {message.trim().length}/50 characters
              </p>
            )}
          </div>
        {submitMessage && (
          <div
            className={`form-notification ${submitStatus}`}
            role="status"
            aria-live="polite"
          >
        {submitMessage}
          </div>
            )}
          {/* Submit button is disabled while form remains invalid */}
          <button type="submit" disabled={!isFormValid}>
            Submit
          </button>
        </form>
      </section>
    </div>
  )
}

export default About
