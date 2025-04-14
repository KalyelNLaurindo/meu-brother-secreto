export class Participant {
    constructor(id, firstName, lastName = "") {
      if (!firstName?.trim()) {
        throw new Error("O nome é obrigatório.");
      }
      this.id = id;
      this.firstName = firstName.trim();
      this.lastName = lastName.trim();
    }
  
    get fullName() {
      return this.lastName
        ? `${this.firstName} ${this.lastName}`
        : this.firstName;
    }
  }
  