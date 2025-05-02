import React from 'react'

function Header() {
  return (
    <header className="header">
        <nav>
          <h1>Mon Portfolio</h1>
          <ul className="nav-links">
            <li>
              <a href="#about">À propos</a>
            </li>
            <li>
              <a href="#projects">Projets</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
  )
}

export default Header