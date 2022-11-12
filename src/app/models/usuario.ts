export class Usuario{
  constructor(
    public uid: string,
    public username: string,
    public email: string,
    public password: string,
    public enabled: string
  ){}
}