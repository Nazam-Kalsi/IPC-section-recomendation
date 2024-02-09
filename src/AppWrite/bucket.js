import config from "../configEnv/config";
import { Databases, Client, ID } from "appwrite";

class storage {
  client;
  databases;
  construntor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndPoint)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
  }
  async submitFIR({ name, phoneNo, state, distict, date, fir, userId }) {
    try {
      return await databases.createDocument(
        config.databaseId,
        config.collectionIdUser,
        ID.unique(),
        {
          name,
          phoneNo,
          state,
          distict,
          date,
          fir,
          userId,
        }
      );
    } catch (error) {
      return error.message;
    }
  }

  async deleteFIR(Id) {
    try {
      await this.databases.deleteDocument(
        config.databaseId,
        config.collectionIdFir,
        Id
      );
    } catch (error) {
      return error.message;
    }
  }

  async getFIR(id) {
    try {
      return await databases.getDocument(
        config.databaseId,
        config.collectionIdUser,
        id
      );
    } catch (error) {
      return error.message;
    }
  }
}
