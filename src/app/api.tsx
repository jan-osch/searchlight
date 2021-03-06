import * as _ from 'lodash';
import axios from 'axios';
import {IEntry} from '../../server/interfaces';

class Api {
  static async performFetch(query: string): Promise<Array<IEntry>> {
    const response = await axios.get(`api/lines?query=${query}`);

    return response.data;
  }

  static async performGetFullResult(query: string): Promise<Array<IEntry>> {
    const response = await axios.get(`api/lines?query=${query}&full=true`);

    return response.data;
  }
}


export default class ApiHelper {
  static prefetch: (query: string) => Promise<Array<IEntry>> = _.memoize(Api.performFetch);
  static getFullResult: (query: string) => Promise<Array<IEntry>> = _.memoize(Api.performGetFullResult);
}
