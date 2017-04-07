import {Entry} from "./interfaces";

export default class Api {
  static async query(queryString: string): Promise<Array<Entry>> {
    const response = await fetch(`api/${queryString}`, {
      method: 'GET',
    });

    return response.json();
  }
}
