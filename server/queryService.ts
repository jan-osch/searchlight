import * as elasticsearch from 'elasticsearch';
import config from './serverConfig';
import {Entry} from '../src/app/interfaces';

const client = elasticsearch.Client({
  host: `${config.elastic.host}:${config.elastic.port}`
});


export default class QueryService {
  static async search(params: { text: string, limit: number, offset: number }): Promise<Array<Entry>> {
    const result = await client.search(
      {
        index: 'subs',
        body: {
          from: params.offset,
          size: params.limit,
          query: {
            query_string: {
              query: params.text,
              fields: ['text']
            }
          },
        }
      }
    );

    return result.hits.hits.map(e => e._source);
  }
}
