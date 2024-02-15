import { Client, Account,ID} from "appwrite";
import config from "../configEnv/config";

class authentication {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteEndPoint)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async signup( email, password, name ) {
    try {
      let newUser = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return newUser;
      // if (newUser) {
      //   return await this.account.createVerification("https://localhost");
      // }
    } catch (error) {
      return error.message;
    }
  }

  // async emailVerification(userId, secret) {
  //   return await this.account.updateVerification(userId, secret);
  // }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      return error.message;
    }
  }
  async currentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      return error.message;
    }
  }
}

const auth=new authentication();
export default auth;