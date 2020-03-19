import { userStatus } from './userStatus';

export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    nom: string;
    prenom: string;
    adresse: string;
    telephone: string;
    photo: string;
    statut: userStatus;
}
