import * as _ from 'lodash';
import axios from 'axios';
import {Entry} from './interfaces';

class Api {
  static async performFetch(query: string): Promise<Array<Entry>> {
    const response = await axios.get(`api/lines?query=${query}`);

    return response.data;
  }

  static async performGetFullResult(query: string): Promise<Array<Entry>> {
    const response = await axios.get(`api/lines?query=${query}&full=true`);

    return response.data;
  }
}


export default class ApiHelper {
  static prefetch: (query: string) => Promise<Array<Entry>> = _.memoize(Api.performFetch);
  static getFullResult: (query: string) => Promise<Array<Entry>> = _.memoize(Api.performGetFullResult);
}
