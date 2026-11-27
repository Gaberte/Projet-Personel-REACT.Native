import { createContext, useContext } from 'react';
import { usePanier } from '../hooksPersonnalisés/Panier';

// 1) On crée le "contexte" : une boîte vide pour l'instant
const PanierContext = createContext(null);

// 2) Le Provider appelle usePanier une fois et met le résultat dans la boîte.
// Tout composant placé à l'intérieur ("children") pourra la lire.
export const PanierProvider = ({ children }) => {
  const panier = usePanier();
  return <PanierContext.Provider value={panier}>{children}</PanierContext.Provider>;
};

// 3) Un petit hook personnalisé pour lire la boîte
export const usePanierContext = () => {
  const panier = useContext(PanierContext);
  if (!panier) {
    throw new Error('usePanierContext doit être utilisé à l\'intérieur d\'un PanierProvider');
  }
  return panier;
};