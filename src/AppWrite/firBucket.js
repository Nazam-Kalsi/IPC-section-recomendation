import config from "../configEnv/config";
import { Databases, Client, ID } from "appwrite";

class FIRservice {
  client;
  databases;
  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteEndPoint)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }
  async submitFIR({ name, phoneNo, state, district, date, fir, userId }) {
    try {
      return await this.databases.createDocument(
        config.databaseId,
        config.collectionIdFir,
        ID.unique(),
        {
          name,
          phoneNo,
          state,
          district,
          date,
          fir,
          userId,
        }
      );
    } catch (error) {
      throw new Error(error);
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
      return await this.databases.getDocument(
        config.databaseId,
        config.collectionIdFir,
        id
      );
    } catch (error) {
      return error.message;
    }
  }

  async allFIRs() {
    try {
      const data = await this.databases.listDocuments(
        config.databaseId,
        config.collectionIdFir
      );
      if (data) return data;
      else return null;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const firdata = new FIRservice();
export default firdata;
