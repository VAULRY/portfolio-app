import React, { useState, useEffect, useRef } from "react";
// import './mouvement.js';
import { initializeParticles, handleMouseInteraction } from "./mouvement.js";
import "./index.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ContactForm from "./ContactForm.jsx";
import ProjectCard from "./ProjectCard"; // Import du composant



/**
 * Composant principal de l'application.
 *
 * @component
 * @returns {JSX.Element} Structure complète du portfolio.
 */

function App() {
  const baseUrl = "http://localhost:1337";
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectValue, setSelectValue] = useState("0");
  const [copyProjects, setCopyProjects] = useState([]);

  // Définition des références
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  /**
   * Récupère la liste des projets depuis l'API Strapi.
   *
   * @async
   * @function getProjects
   * @returns {Promise<void>} Met à jour l'état `projects` avec les données récupérées.
   */

  // Fonction pour récupérer les projets depuis Strapi

  async function getProjects() {
    try {
      const request = await fetch(
        `${baseUrl}/api/projects?populate=covers&populate=technologies.icon`
      );
      const response = await request.json();
      console.log("Données API récupérées :", response.data);
      setProjects(response.data);
      setCopyProjects(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des projets :", error);
    }
  }
  /**
   * Récupère la liste des technologies depuis l'API Strapi.
   *
   * @async
   * @function getTechnologies
   * @returns {Promise<void>} Met à jour l'état `categories` avec les technologies récupérées.
   */

  // Fonction pour récupérer les technologies utilisées

  async function getTechnologies() {
    try {
      const request = await fetch(`${baseUrl}/api/technologies?populate=icon`);
      const response = await request.json();
      console.log("Données API récupérées :", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des projets :", error);
    }
  }
  /**
   * Initialise les projets, technologies et animations au chargement de la page.
   *
   * @useEffect
   */

  useEffect(() => {
    getProjects();
    getTechnologies();
    initializeParticles();
    handleMouseInteraction();
  }, []);
  /**
   * Met à jour la liste des projets en fonction de la technologie sélectionnée.
   *
   * @useEffect
   * @param {string} selectValue - ID de la technologie sélectionnée.
   */

  useEffect(() => {
    let data = [...copyProjects];

    // Assure-toi que "Tout" restaure la liste complète
    if (selectValue === "0" || selectValue === "" || !selectValue) {
      setProjects(copyProjects);
    } else {
      data = data.filter((project) =>
        project.technologies.some((c) => c.id == selectValue)
      );
      setProjects(data);
    }
  }, [copyProjects, selectValue]);

  return (
    <div>
      {/* HEADER */}
      <Header
        aboutRef={aboutRef}
        projectsRef={projectsRef}
        contactRef={contactRef}
      />
      {/* animation */}
      <div id="particles-container" className="particles-container"></div>

      <div className="gradient-background">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
        <div className="glow"></div>
        <div className="grid-overlay"></div>
        <div className="noise-overlay"></div>
        {/* <div class="particles-container" id="particles-container"></div> */}
      </div>
      {/* Contenu principal */}
      <main>
        {/* SECTION À PROPOS */}
        <section id="general" className="section general">
          <img src="./assets/apiun.jpeg" alt="API1" />

          <section id="about" className="section about" ref={aboutRef}>
            <h2>À propos de moi</h2>
           <img src="./assets/marielaure.jpg" alt="Profil" />

         


            <p>
              Bienvenue sur mon portfolio ! Je suis développeur web passionné.
            </p>
            <p>
              <strong>Téléphone : </strong>0693 00 00 00
            </p>
            <p>
              <strong>Email : </strong>
              <a href="mailto:moi@hotmail.fr">moi@hotmail.fr</a>
            </p>
            <button>
              <a href="chemin-vers-ton-CV.pdf" download>
                Télécharger mon CV
              </a>
            </button>
          </section>
          <img src="./assets/apideux.jpeg" alt="API2" />

        </section>

        {/* projet */}
        <section id="projects" className="section projects" ref={projectsRef}>
          <h2>Mes Projets</h2>
          <ProjectCard
            project={{
              id: 1,
              title: "Mon projet",
              description: "Description",
              technologies: [{ id: 1, name: "React" }],
            }}
          />

          <p className="card-technologies">Technologies utilisées :</p>
          <div className="card-technologies-container">
            <button onClick={() => setSelectValue("")}>Tout</button>

            {categories?.map((tech) => (
              <button
                onClick={() => setSelectValue(tech.id)}
                key={tech.id}
                className="technology-item"
              >
                <p>{tech.name || "Technologie indisponible"}</p>
                <img
                  src={baseUrl + tech.icon?.url}
                  alt={tech.name}
                  className="technology-icon"
                />
              </button>
            )) || <p>Aucune technologie trouvée.</p>}
          </div>

          <div className="container">
            {!projects.length && <p>Aucun projet trouvé.</p>}
            {projects.map((p) => (
              <div key={p.id} className="card">
                <div className="card-content">
                  <p className="card-title">
                    {p.title || "Titre indisponible"}
                  </p>
                  <img src={baseUrl + p.covers?.url || ""} alt={p.title} />
                  <p className="card-description">
                    {p.description || "Description indisponible"}
                  </p>
                  <a
                    href={p.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir sur GitHub
                  </a>
                  {/* map technologie */}
                  <div className="card-technologies-container">
                    <p className="card-technologies">
                      Technologies utilisées :
                    </p>

                    {p.technologies?.map((tech) => (
                      <div key={tech.id} className="technology-item">
                        <p>{tech.name || "Technologie indisponible"}</p>
                        <img
                          src={baseUrl + tech.icon?.url || ""}
                          alt={tech.name}
                          className="technology-icon"
                        />
                      </div>
                    )) || <p>Aucune technologie trouvée.</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION CONTACT */}
        <section id="contact" className="section contact" ref={contactRef}>
          <h2>Me Contacter</h2>
          <ContactForm />
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
