import { useEffect, useState } from "react";
// import './mouvement.js';
import { initializeParticles, handleMouseInteraction } from "./mouvement.js";

import "./index.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ContactForm from "./ContactForm.jsx";

function App() {
  const baseUrl = "http://localhost:1337";
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectValue, setSelectValue] = useState("0");
  const [copyProjects, setCopyProjects] = useState([]);

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

  useEffect(() => {
    getProjects();
    getTechnologies();
    initializeParticles();
    handleMouseInteraction();
  }, []);
  useEffect(() => {
    var data = [...copyProjects];
    if (selectValue == "0") {
      setProjects(data);
    } else {
      data = data.filter((project) =>
        project.technologies.some((c) => c.id == selectValue)
      );
      setProjects(data);
    }
  }, [selectValue]);

  return (
    <div>
      {/* HEADER */}

      <Header />
      {/* Contenu principal */}
      <main>
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

        {/* SECTION À PROPOS */}
        <section id="general" className="section general">
          <img src="téléchargement.jpeg" alt="API1" />
          <section id="about" className="section about">
            <h2>À propos de moi</h2>
            <img
              src="Marie Laure.jpg"
              alt="Photo de profil"
              className="profile-photo"
            />
            <p>
              Bienvenue sur mon portfolio ! Je suis développeur web passionné.
            </p>
            <p>
              <strong>Téléphone : </strong>0693 00 00 00
            </p>
            <p>
              <strong>Email : </strong>
              <a href="mailto:moi@hotmail.fr">
                moi@hotmail.fr
              </a>
            </p>
            <button>
              <a href="chemin-vers-ton-CV.pdf" download>
                Télécharger mon CV
              </a>
            </button>
          </section>
          <img src="téléchargement (1).jpeg" alt="API2" />
        </section>

        {/* projet */}
        <section id="projects" className="section projects">
          <h2>Mes Projets</h2>

          <div className="card-technologies-container">
            <p className="card-technologies">Technologies utilisées :</p>
            <button onClick={() => setSelectValue("0")}>Tout</button>

            {categories?.map((tech) => (
              <button
                onClick={() => setSelectValue(tech.id)}
                key={tech.id}
                className="technology-item"
              >
                <p>{tech.name || "Technologie indisponible"}</p>
                <img
                  src={baseUrl + tech.icon.url}
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

                  {/* map tri */}
                  {/* <div className="card-technologies-container">
                    <button>{categories.name}</button>

                    {p.categories?.map((category) => (
                      <div key={getTechnologies} className="technology-item">
                        <p>{category.name || "Technologie indisponible"}</p>
                      </div>
                    )) || <p>Aucune technologie trouvée.</p>}
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION CONTACT */}
        <section id="contact" className="section contact">
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
