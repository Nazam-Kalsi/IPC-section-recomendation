import { Client, Databases } from "appwrite";
import config from "../configEnv/config";

class user {
  client;
  databases;
  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndPoint)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }
  storeData = async ({
    firstname,
    lastname,
    addahar,
    phone,
    userid,
    userType = "common",
    password
  }) => {
    try {
      return await this.databases.createDocument(
        config.databaseId,
        config.collectionIdUser,
        userid,
        {
          firstname,
          lastname,
          addahar,
          phone,
          userid,
          userType,
          password,
        }
      );
    } catch (error) {
      console.log(error);
      //   return error.message;
      throw new Error(error);
    }
  };
  getInfo = async (dataid) => {
    try {
      return await this.databases.getDocument(
        config.databaseId,
        config.collectionIdUser,
        dataid
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  updateInfo = async (
    id,
     firstname, lastname, addahar, phone, userid, userType 
  ) => {
    try {
      await this.databases.updateDocument(
        config.databaseId,
        config.collectionIdUser,
        id,
        {
          firstname,
          lastname,
          addahar,
          phone,
          userid,
          userType,
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  };
}

const userData = new user();
export default userData;
