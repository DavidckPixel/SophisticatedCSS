class Question{
    private username : string;
    private email : string;
    private password : string; 

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

    public getPassword() : string{
        return this.password;
    }

    public setPassword(password : string){
        this.password = password;
    }
    
}