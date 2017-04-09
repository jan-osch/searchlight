import * as elasticsearch from 'elasticsearch';
import * as _ from 'lodash';
import config from './serverConfig';
import {Entry} from '../src/app/interfaces';

const client = elasticsearch.Client({
  host: `${config.elastic.host}:${config.elastic.port}`
});

async function performSearch(params: { text: string, limit: number, offset: number }): Promise<Array<Entry>> {
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


export default class QueryService {
  static search: (params: { text: string, limit: number, offset: number }) => Promise<Array<Entry>> = _.memoize(performSearch);
}
