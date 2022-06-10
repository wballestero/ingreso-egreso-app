

export class Usuario {

    static fromFirebase( uid:any, email:any, nombre:any   ) {
        return new Usuario( uid, email, nombre );
    }


    constructor(
        public nombre: string,
        public uid: string,
        public email: string,
       

    ){}

}
