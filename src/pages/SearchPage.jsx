// pages/SearchPage.jsx
import { useLocation } from 'react-router-dom';

export function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  
  return (
    <div>
      <h1>Resultados para: {query}</h1>
      {/* Search results implementation */}
    </div>
  );
}