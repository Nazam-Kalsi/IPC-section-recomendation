import { Client, Account, ID } from "appwrite";
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

  async signup(email, password, name) {
    try {
      let newUser = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return newUser;
    } catch (error) {
      return error.message;
    }
  }

  async createVerification(){
    try{
      if (newUser) {
        return await this.account.createVerification("https://localhost");
      }
    }
    catch(error){
      throw new Error(error.message);
    }
  }

  async emailVerification(userId, secret) {
    return await this.account.updateVerification(userId, secret);
  }

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

  logout = async () => {
    return await this.account.deleteSession("current");
  };

  updateEmail = async ( email,password) => {
    try {
      return await this.account.updateEmail(email,password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updatePassword = async (  newPassword ) => {
    try {
      return await this.account.updatePassword( newPassword );
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
}

const auth = new authentication();
export default auth;
