import { useState, useCallback, useMemo } from 'react';

// Un hook personnalisé est une fonction dont le nom commence par "use"
// et qui peut appeler d'autres hooks. Ici, il regroupe toute la logique du panier.
export const usePanier = () => {
  // Chaque ligne du panier : { id, nom, categorie, prix, stock, quantite }
  const [lignes, setLignes] = useState([]);

  const ajouter = useCallback((produit) => {
    setLignes((actuelles) => {
      const existe = actuelles.find((l) => l.id === produit.id);
      if (existe) {
        // Déjà dans le panier : on augmente seulement la quantité de cette ligne
        return actuelles.map((l) =>
          l.id === produit.id ? { ...l, quantite: l.quantite + 1 } : l
        );
      }
      // Nouveau produit : on le copie et on ajoute quantite: 1
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