import { useState, useCallback, useMemo } from 'react';


export const usePanier = () => {
  // Chaque ligne du panier : { id, nom, categorie, prix, stock, quantite }
  const [lignes, setLignes] = useState([]);

  const ajouter = useCallback((produit) => {
    setLignes((actuelles) => {
      const existe = actuelles.find((l) => l.id === produit.id);
      if (existe) {
        // augmentation de la quantité de la ligne
        return actuelles.map((l) =>
          l.id === produit.id ? { ...l, quantite: l.quantite + 1 } : l
        );
      }
      // Copie du nouveau produit : copie et ajoute quantite: 1
      return [...actuelles, { ...produit, quantite: 1 }];
    });
  }, []);

  const retirer = useCallback((id) => {
    setLignes((actuelles) => actuelles.filter((l) => l.id !== id));
  }, []);

  const vider = useCallback(() => setLignes([]), []);

  // Total en euros : recalculé seulement quand "lignes" change
  const total = useMemo(
    () => lignes.reduce((somme, l) => somme + l.prix * l.quantite, 0),
    [lignes]
  );

  // Nombre d'articles (en tenant compte des quantités)
  const nombreArticles = useMemo(
    () => lignes.reduce((n, l) => n + l.quantite, 0),
    [lignes]
  );

  return { lignes, total, nombreArticles, ajouter, retirer, vider };
};