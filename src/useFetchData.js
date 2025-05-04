import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour récupérer des données depuis une API.
 *
 * @param {string} url - URL de l'API à appeler.
 * @returns {Object} Contient les données, l'état de chargement et les erreurs.
 */
function useFetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erreur lors du chargement des données");
        const result = await response.json();
        setData(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetchData;
