/**
 * Composant affichant un projet sous forme de carte.
 *
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.project - Les données du projet à afficher
 * @param {number} props.project.id - L'identifiant du projet
 * @param {string} props.project.title - Le titre du projet
 * @param {string} props.project.description - La description du projet
 * @param {Array} props.project.technologies - Les technologies utilisées dans le projet
 * @returns {JSX.Element} Carte de projet
 */
function ProjectCard({ project }) {
    return (
      <div className="project-card">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="technologies">
          {project.technologies.map(tech => (
            <span key={tech.id} className="tech-tag">{tech.name}</span>
          ))}
        </div>
      </div>
    );
  }
  
  export default ProjectCard;
  