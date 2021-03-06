import { verify } from "argon2";

export default class User {
    private username : string;
    private email : string;
    private password : string; 

    constructor(username : string, email : string, password : string){
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public getUsername() : string{
        return this.username;
    }

    public setUsername(username : string){
        this.username = username;
    }

    public getEmail() : string{
        return this.email;
    }

    public setEmail(email : string){
        this.email = email;
    }

    public async verifyPassword(rawpass : string) : Promise<boolean> {
        return await verify(this.password, rawpass);
    }

    public setPassword(password : string){
        this.password = password;
    }
    
}