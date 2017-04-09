import * as Bacon from 'baconjs';
import ApiHelper from './api';

const notEmpty = e => e.length > 1;
const TIMEOUT = 2500; // 2.5 seconds

const smallChangeBus = new Bacon.Bus();

const submitBus = new Bacon.Bus();

const submitEnabledStream = smallChangeBus
  .map(notEmpty);

const previewEntriesStream = smallChangeBus
  .map((e: string) => e.trim())
  .flatMapLatest(
    query => query.length > 1
      ? Bacon.fromPromise(ApiHelper.prefetch(query))
      : []
  );

const triggerFullFromTimeoutStream = smallChangeBus
  .debounce(TIMEOUT);

const triggerFullFromSubmitPressedStream = Bacon
  .combineWith((p, s) => s, submitBus, smallChangeBus)
  .changes();

const fullEntriesStream = triggerFullFromSubmitPressedStream
  .merge(triggerFullFromTimeoutStream)
  .map((e: string) => e.trim())
  .filter(notEmpty)
  .skipDuplicates()
  .flatMapLatest(
    query => query.length > 1
      ? Bacon.fromPromise(ApiHelper.getFullResult(query))
      : []
  );

const entriesStream = fullEntriesStream
  .merge(previewEntriesStream);

export default {
  smallChangeBus,
  submitBus,
  entriesStream,
  submitEnabledStream,
};
