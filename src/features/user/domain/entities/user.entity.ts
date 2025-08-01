export class User {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) {}

    validate() {
        if(!this.email.includes('@')) throw new Error('Inavlide email format');
        if(this.password.length < 6) throw new Error('Password is too short');
    }
}