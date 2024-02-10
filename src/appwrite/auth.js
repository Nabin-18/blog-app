
import conf from "../conf/conf.js"
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;


    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId)
        // .setKey(conf.apiKey);
        this.account = new Account(this.client);
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call another method
                // return userAccount
                return this.login({ email, password });
            }
            else {
                return userAccount;
            }

        } catch (error) {
            throw error;

        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);

        }
        catch (error) {
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();

        } catch (error) {
            // throw error;
            console.log("Appwrite service :: getCurrentUser :: error", error)

        }
        return null;
    }
    async logOut() {
        try {
            await this.account.deleteSessions('all')

        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)


        }
    }

}
const authService = new AuthService();
export default authService;