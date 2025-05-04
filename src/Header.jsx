import React, { useState, useEffect } from "react";

/**
 * Composant affichant le menu de navigation du portfolio.
 *
 * @component
 * @param {Object} props - Les références des sections du portfolio.
 * @param {React.RefObject} props.aboutRef - Référence à la section À propos.
 * @param {React.RefObject} props.projectsRef - Référence à la section Projets.
 * @param {React.RefObject} props.contactRef - Référence à la section Contact.
 * @returns {JSX.Element} Le header avec la navigation.
 */
function Header({ aboutRef, projectsRef, contactRef }) {
  const [activeSection, setActiveSection] = useState("");

  // Fonction pour scroller vers une section spécifique
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fonction pour détecter la section active
  const handleScroll = () => {
    const sections = [
      { id: "about", ref: aboutRef },
      { id: "projects", ref: projectsRef },
      { id: "contact", ref: contactRef }
    ];

    sections.forEach(({ id, ref }) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          setActiveSection(id);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header">
      <nav>
        <h1>Mon Portfolio</h1>
        <ul className="nav-links">
          <li>
            <button className={activeSection === "about" ? "active" : ""} onClick={() => scrollToSection(aboutRef)}>
              À propos
            </button>
          </li>
          <li>
            <button className={activeSection === "projects" ? "active" : ""} onClick={() => scrollToSection(projectsRef)}>
              Projets
            </button>
          </li>
          <li>
            <button className={activeSection === "contact" ? "active" : ""} onClick={() => scrollToSection(contactRef)}>
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
