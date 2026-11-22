
const IMAGES_DIRECTES = {
  'Jupe plissée': 'https://i.pinimg.com/736x/39/11/ec/3911ecd16571cbebafeffce4a17e714a.jpg',
  'Chemisier en satin': 'https://i.pinimg.com/736x/d3/4e/f4/d34ef4aeb130428d08aaf00389ac4199.jpg',
  'Jean taille haute': 'https://i.pinimg.com/736x/8f/1f/fd/8f1ffd03cc7ff52e44a0307a65c43acf.jpg',
  'Ensemble deux pièces': 'https://i.pinimg.com/736x/77/ce/a1/77cea1de48701808bad0c47e26921925.jpg',
  'Veste en jean': 'https://i.pinimg.com/1200x/bc/52/ce/bc52ce4b7c9821349cfb834ce9da741b.jpg',

  'Chemise classique': 'https://i.pinimg.com/736x/22/d9/d7/22d9d732d93c0b7f26b8194f85fd9d19.jpg',
  'Pantalon chino': 'https://i.pinimg.com/736x/d2/88/ea/d288eafd011005f6c42d00819f6c7ca2.jpg    ',
  'Polo en coton': 'https://i.pinimg.com/736x/09/c8/35/09c83509c6e7d9fc2895212770ede422.jpg',
  'Costume deux pièces': 'https://i.pinimg.com/1200x/78/b4/a2/78b4a28ca3696c571dbf8b85a78a8e3b.jpg',
  'Jean slim': 'https://i.pinimg.com/736x/c4/f5/e2/c4f5e245cbcf36d112b2dfbaf7032dcd.jpg',
  'Sweat à capuche': 'https://i.pinimg.com/1200x/77/4c/84/774c8474aad85e3b53520559e2547ca2.jpg',

  'Robe pour fille': 'https://i.pinimg.com/736x/18/64/f9/1864f9cae3cf356aa323487291ccbed7.jpg',
  'Ensemble garçon': 'https://i.pinimg.com/736x/8f/e7/d2/8fe7d2c043083675522bb7c548a1b674.jpg',
  'T-shirt imprimé': 'https://i.pinimg.com/736x/89/13/93/89139396d4da444a50a31344b3aeac66.jpg',
  'Pantalon enfant': 'https://i.pinimg.com/736x/d8/ff/c4/d8ffc42dcce443dddfea93cb2f878c65.jpg',
  'Veste à capuche': 'https://i.pinimg.com/736x/9b/03/b8/9b03b8735ba8ba2026cb974b51ef0b7b.jpg',
  'Pyjama enfant': 'https://i.pinimg.com/1200x/bf/81/03/bf8103802c164f1d586b2342428acad0.jpg',

  'Sac à main en cuir': 'https://i.pinimg.com/736x/e5/bf/02/e5bf02e78766302cae25b31d85cea752.jpg',
  'Ceinture en cuir': 'https://i.pinimg.com/1200x/90/cd/6b/90cd6ba64a65276d012a0e883f8a0ae3.jpg',
  'Écharpe en laine': 'https://i.pinimg.com/1200x/e7/10/b9/e710b99064b6cd712240f9e2cad96e32.jpg',
  'Casquette tendance': 'https://i.pinimg.com/736x/4e/1c/70/4e1c703b1fbb267201eaa1108f7db344.jpg',
  'Lunettes de soleil': 'https://i.pinimg.com/736x/4b/ea/06/4bea067a6ecdfafa9f4fb19eb373558f.jpg',
  'Chapeau élégant': 'https://i.pinimg.com/736x/7e/c0/f2/7ec0f29007862a72b0e156ecf05e6dd7.jpg',
};

// 2) SINON : un mot-clé anglais déduit d'un mot du nom du produit.
// L'ordre compte : on s'arrête à la première règle qui correspond
// ("chemisier" doit passer avant "chemise", "veste" avant "jean").
const REGLES = [
  ['chemisier', 'blouse'],
  ['chemise', 'shirt'],
  ['robe', 'dress'],
  ['jupe', 'skirt'],
  ['veste', 'jacket'],
  ['jean', 'jeans'],
  ['pantalon', 'trousers'],
  ['polo', 'polo'],
  ['costume', 'suit'],
  ['sweat', 'hoodie'],
  ['t-shirt', 'tshirt'],
  ['pyjama', 'pajamas'],
  ['ensemble', 'outfit'],
  ['sac', 'handbag'],
  ['ceinture', 'belt'],
  ['écharpe', 'scarf'],
  ['casquette', 'cap'],
  ['lunettes', 'sunglasses'],
  ['chapeau', 'hat'],
];

// 3) EN DERNIER RECOURS : un mot-clé par catégorie
const PAR_CATEGORIE = {
  Femme: 'fashion',
  Homme: 'menswear',
  Enfant: 'kids',
  Accessoires: 'accessories',
  
};

export const imagePour = (produit) => {
  // Une adresse choisie par toi passe toujours en premier
  if (IMAGES_DIRECTES[produit.nom]) return IMAGES_DIRECTES[produit.nom];

  const nom = produit.nom.toLowerCase(); // minuscules, pour comparer sans se soucier des majuscules
  // .find parcourt REGLES et renvoie la première ligne dont le mot est contenu dans le nom
  const regle = REGLES.find(([mot]) => nom.includes(mot));
  const motCle = regle ? regle[1] : PAR_CATEGORIE[produit.categorie];

  if (!motCle) return null;
  // 480 x 360 : une image plus large que haute, adaptée à la carte
  return `https://loremflickr.com/480/360/${motCle}?lock=${produit.id}`;
};