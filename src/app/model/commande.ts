import { User } from './user';
import { Plat } from './plat';

export class Commande {
    id: number;
    // tslint:disable-next-line: variable-name
    date_commande: Date;
    user: User;
    plats: Plat[];
}
