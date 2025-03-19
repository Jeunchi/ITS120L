import { Client, Account, Databases, ID, Query } from "appwrite";

export const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("67d957050035ac972c15");

export const account = new Account(client);
export const databases = new Databases(client); // Ensure this is exported
export { ID, Query };
