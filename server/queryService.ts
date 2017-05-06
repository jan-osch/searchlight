import * as elasticsearch from 'elasticsearch'
import * as _ from 'lodash'
import config from './serverConfig'
import {IEntry} from './interfaces'

const client = new elasticsearch.Client({
  host: config.elastic.host,
})

async function performSearch(params: { text: string, limit: number, offset: number }): Promise<Array<IEntry>> {
  const result = await client.search(
    {
      index: 'subs',
      body: {
        from: params.offset,
        size: params.limit,
        query: {
          match_phrase_prefix: {
            text: {
              query: params.text,
              slop: 10,
            }
          }
        },
      }
    }
  )

  return result.hits.hits.map(e => e._source) as any
}


export default class QueryService {
  static search: (params: { text: string, limit: number, offset: number }) => Promise<Array<IEntry>> = _.memoize(performSearch)
}
