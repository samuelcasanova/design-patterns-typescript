export class User {
  name: string
}

export class Customer extends User {
  company: string
}

export class Admin extends User {
  isRoot: boolean
}

export class UserSimpleFactory {
  public static create(type: string) {
      switch (type) {
          case 'user': return new User()
          case 'customer': return new Customer()
          case 'admin': return new Admin()
          default:
              throw new Error('Wrong user type passed.')
      }
  }
}