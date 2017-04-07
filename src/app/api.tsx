import {Entry} from './interfaces';
import * as _ from 'lodash';

class Api {
  static async performFetch(query: string): Promise<Array<Entry>> {
    const response = await fetch(`api/lines?query=${query}`, {
      method: 'GET',
    });

    return response.json();
  }

  static async performGetFullResult(query: string): Promise<Array<Entry>> {
    const response = await fetch(`api/lines?query=${query}&full=true`, {
      method: 'GET',
    });

    return response.json();
  }
}


export default class ApiHelper {
  static prefetch: (query: string) => Promise<Array<Entry>> = _.memoize(Api.performFetch);
  static getFullResult: (query: string) => Promise<Array<Entry>> = _.memoize(Api.performGetFullResult);
}
