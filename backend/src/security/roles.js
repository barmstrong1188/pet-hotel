/**
 * List of Roles available for the Users.
 */
class Roles {
  static get values() {
    return {
      manager: 'manager',
      employee: 'employee',
      petOwner: 'petOwner',
    };
  }
}

module.exports = Roles;
