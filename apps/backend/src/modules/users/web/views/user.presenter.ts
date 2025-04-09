
export class UserProfilePresenter {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;

  constructor(payload: any) {
    this.id = payload.id;
    this.firstName = payload.firstname;
    this.lastName = payload.lastname;
    this.email = payload.email;
  }
}
