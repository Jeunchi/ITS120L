class UserModel {
  constructor(user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.username = user.username;
    this.employeenumber = user.employeenumber;
    this.password = user.password;
  }
}
export default UserModel;