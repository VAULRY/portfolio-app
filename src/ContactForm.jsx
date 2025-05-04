import { useForm } from "react-hook-form";
import axios from "axios";
import emailjs from "emailjs-com";
import.meta.env.VITE_SERVICE_ID;
import.meta.env.VITE_TEMPLATE_ID;
import.meta.env.VITE_USER_ID;
const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const baseUrl = "http://localhost:1337";

  const onSubmit = async (data) => {
    try {
      // Enregistrement du message dans Strapi
      await axios.post(`${baseUrl}/api/contacts`, {
        data: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          date: new Date(),
        },
      });

      // Envoi d'un email via EmailJS
      emailjs
        .send(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          data,
          import.meta.env.VITE_USER_ID
        )

        .then(() => {
          alert("Message envoyé avec succès !");
          reset(); // Réinitialisation du formulaire
        })
        .catch((error) => console.error("Erreur EmailJS :", error));
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Nom :</label>
      <input
        {...register("name", { required: true })}
        type="text"
        id="name"
        name="name"
      />
      {errors.name && <span>Ce champ est obligatoire</span>}

      <label htmlFor="email">Email :</label>
      <input
        {...register("email", { required: true })}
        type="email"
        id="email"
        name="email"
      />
      {errors.email && <span>Email invalide</span>}

      <label htmlFor="subject">Objet :</label>
      <input
        {...register("subject", { required: true })}
        type="text"
        id="subject"
        name="subject"
      />
      {errors.subject && <span>Ce champ est obligatoire</span>}

      <label htmlFor="message">Message :</label>
      <textarea
        {...register("message", { required: true })}
        id="message"
        name="message"
      ></textarea>
      {errors.message && <span>Ce champ est obligatoire</span>}

      <button type="submit">Envoyer</button>
      {/* Boutons de retour vers les autres sections */}
  <div className="navigation-buttons">
    <button onClick={() => scrollToSection("about")}>Retour à "À propos"</button>
    <button onClick={() => scrollToSection("projects")}>Retour "aux Projets"</button>
  </div>
    </form>
  );
};

export default ContactForm;
