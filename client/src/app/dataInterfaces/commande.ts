export interface Commande {
    id?: string;
    date?: string;
    idClient?: string;
    idPlats?: string[];
    idFilms?: string[];
    prix?: number;
    adresseLivraison?: string;
}
