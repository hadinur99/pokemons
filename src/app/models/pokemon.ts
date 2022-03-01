export class Pokemon {
    
    id!: number;
    name!: String;
    imageUrl!: String;
    types: Array<String> = [];
    weight!: number;
    height!: number;
    moves: Array<string> = [];
    abilities: Array<string> = [];
    nickName!: String;

}
