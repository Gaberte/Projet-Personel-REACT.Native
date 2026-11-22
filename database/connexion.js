import * as SQLite from 'expo-sqlite' ;
let dbPromise = null; 
export const getDb = () => {
    if (!dbPromise) dbPromise = SQLite.openDatabaseAsync('houseofclothes.db');
    return dbPromise
};