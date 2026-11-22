import { getDb } from './connexion';
const PRODUITS_DE_DEPART = [
 
  
  ['Jupe plissée', 'Femme', 24.5, 40],
  ['Chemisier en satin', 'Femme', 35, 7],
  ['Jean taille haute', 'Femme', 39.9, 15],
  ['Ensemble deux pièces', 'Femme', 59.9, 0],
  ['Veste en jean', 'Femme', 45, 22],

  ['Chemise classique', 'Homme', 29.9, 18],
  ['Pantalon chino', 'Homme', 39, 9],
  ['Polo en coton', 'Homme', 24.5, 25],
  ['Costume deux pièces', 'Homme', 149, 4],
  ['Jean slim', 'Homme', 35, 0],
  ['Sweat à capuche', 'Homme', 32, 30],

  ['Robe pour fille', 'Enfant', 22, 33],
  ['Ensemble garçon', 'Enfant', 39, 11],
  ['T-shirt imprimé', 'Enfant', 9.9, 50],
  ['Pantalon enfant', 'Enfant', 19.9, 27],
  ['Veste à capuche', 'Enfant', 29, 6],
  ['Pyjama enfant', 'Enfant', 18, 14],

  ['Sac à main en cuir', 'Accessoires', 44.9, 20],
  ['Ceinture en cuir', 'Accessoires', 19.9, 16],
  ['Écharpe en laine', 'Accessoires', 22, 8],
  ['Casquette tendance', 'Accessoires', 14.5, 13],
  ['Lunettes de soleil', 'Accessoires', 27, 0],
  ['Chapeau élégant', 'Accessoires', 25, 10]


];
export const initProduits = async () => {
 const db = await getDb();
 await db.execAsync(`
 CREATE TABLE IF NOT EXISTS produits (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 nom TEXT NOT NULL,
 categorie TEXT NOT NULL,
 prix REAL NOT NULL,
 stock INTEGER NOT NULL DEFAULT 0
 );
 `);
 // On ne remplit la table que si elle est vide
 const { n } = await db.getFirstAsync('SELECT COUNT(*) AS n FROM produits');
 if (n > 0) return;
 await db.withTransactionAsync(async () => {
 for (const [nom, categorie, prix, stock] of PRODUITS_DE_DEPART) {
 await db.runAsync(
 'INSERT INTO produits (nom, categorie, prix, stock) VALUES (?, ?, ?, ?)',
 nom, categorie, prix, stock
 );
 }
 });
};

const FILTRE = 'nom LIKE ? AND (? IS NULL OR categorie = ?)';
const parametresFiltre = (recherche, categorie) => [
 `%${recherche.trim()}%`, categorie, categorie,
];
export const listerProduits = async ({
 recherche = '', categorie = null, limite = -1, decalage = 0,
} = {}) => {
 const db = await getDb();
 return db.getAllAsync(
 `SELECT id, nom, categorie, prix, stock FROM produits
 WHERE ${FILTRE}
 ORDER BY nom, id
 LIMIT ? OFFSET ?`,
 ...parametresFiltre(recherche, categorie),
 limite,
 decalage
 );
};
export const compterProduits = async ({ recherche = '', categorie = null } = {}) => {
 const db = await getDb();
 const { n } = await db.getFirstAsync(
 `SELECT COUNT(*) AS n FROM produits WHERE ${FILTRE}`,
 ...parametresFiltre(recherche, categorie)
 );
 return n;
};

export const listerCategories = async () => {
 const db = await getDb();
 const lignes = await db.getAllAsync(
 'SELECT DISTINCT categorie FROM produits ORDER BY categorie'
 );
 return lignes.map((ligne) => ligne.categorie);
};

export const insererProduit = async (nom, categorie, prix, stock) => {
 const db = await getDb();
 const resultat = await db.runAsync(
 'INSERT INTO produits (nom, categorie, prix, stock) VALUES (?, ?, ?, ?)',
 nom, categorie, prix, stock
 );
 return resultat.lastInsertRowId;
};