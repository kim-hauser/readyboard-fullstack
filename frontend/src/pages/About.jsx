import rocket from '../assets/rocket.jpg'
import { useState } from "react"

    // Sets default state to empty
function About() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault() // Stops reload onSubmit; allows React to handle form data.

    // Handles invalid entries:

    if (!isFormValid) return
    
    setName("")
    setEmail("")
    setMessage("")
  }
    // Checks email format using Regex

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
    // Checks for valid name  >= 3 characters

  const isValidName = (name) => {
    return name.trim().length >= 3
  }

    // Checks for valid message length >= 50 characters
  const isValidMessage = (message) => {
    return message.trim().length >= 50
  }

    //Confirms all 3 -> Valid name, email, message content.
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
          This application was built as part of a front-end project to
          demonstrate routing, component structure, and UI design using React. 
          This tool currently uses mock data meant to be representative of "real-world" 
          changes.
        </p>
      </section>

      <section className="card">
        <h2>About the Developer - Kim Hauser</h2>
        
      <div className="about-rocket">
        <img 
          src={rocket} 
          alt="A stock image of a teal rocket with blue exhaust"
          className="about-image"
        />
      </div>
        <p>
          Hi, I’m Kim—an IT professional and member of LaunchCode's Women+ Software Development cohort. 
          I work with Microsoft 365 and Atlassian tools, helping teams navigate complex systems in a way that’s 
          clear and approachable. I specialize in turning complex processes into intuitive, user-friendly experiences. 
          I believe there’s no such thing as too good of a user experience—only better ways to reduce friction and 
          improve clarity. 
        </p>
        <p> 
          I’m currently building ReadyBoard, a lightweight change management tool focused on improving 
          visibility, reducing friction, and helping teams move faster with confidence. When I'm not working on my latest
          project, I recharge by reading and getting outdoors.
        </p>
      </section>

      <section className="card">
        <h2>Contact Me</h2>
        <p>
          Have feedback, ideas, or just want to connect? I’d love to hear from you.
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
              className={name && !isValidName(name) ? "input-invalid" : ""} // className is used as a conditional here, valid shows.
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
              className={email && !isValidEmail(email) ? "input-invalid" : ""}
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
              className={message && !isValidMessage(message) ? "input-invalid" : ""}
            />

            {message && !isValidMessage(message) && (
             <p className="character-count">
              {message.trim().length}/50 characters
            </p>
            )}
          </div>

          {/* Submit button is disabled while form remains not valid. */} 
          <button type="submit" disabled={!isFormValid}>
            Submit
          </button>
        </form>
      </section>
    </div>
  )
}

export default About