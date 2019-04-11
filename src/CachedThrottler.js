import { MINUTE } from 'time-constants';
import NodeCache from 'node-cache';
import Counter from './Counter';

export default class Throttler {
  constructor(maxConnectionAllowed = 1, windowSizeInMinutes = 1) {
    this.config = {
      maxConnectionAllowed,
      windowSizeInMinutes
    }
    this.cache = new NodeCache({ checkperiod: 100, useClones: false });
  }

  connect(ip) {
    this.addIfMissing(ip);
    return this.notExceddedConnections(ip);
  }

  notExceddedConnections(ip) {
    const invocation = this.cache.get(ip);
    const numOfInvocations = invocation.incrementAndGet();
    return numOfInvocations <= this.config.maxConnectionAllowed;
  }

  addIfMissing(ip) {
    let invocation = this.cache.get(ip);
    if (invocation === undefined) {
      this.cache.set(ip, new Counter(), MINUTE + 1000);
    }
    return this.cache.get(ip);
  }
}