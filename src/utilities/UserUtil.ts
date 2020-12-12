import User from '../models/mongoDB/UserDetail';

export class UserUtil {
  static async registerUser(user: any) {
    const newUser = new User(user);
    await newUser.save((err: Error) => {
      console.log('New account has been created');
      return user;
    });
    return user;
  }
}
