export class UserClass {
  public readonly email: string;
  public readonly roles: Roles;

  constructor(authData: {
    email: string
  }) {
    this.email = authData.email;
    this.roles = new Roles({reader: true});
  }
}

class Roles {
  public readonly reader: boolean;
  public readonly manager: boolean;

  constructor(rolesData: {
    reader: boolean,
    manager?: boolean
  }) {
    this.reader = rolesData.reader;
    this.manager = !!rolesData.manager;
  }
}

