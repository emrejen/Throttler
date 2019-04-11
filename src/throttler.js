import { MILLISECONDS_PER_SECOND, SECOND } from 'time-constants';
import Counter from './Counter';
import Invocation from './Invocation';

export default class Throttler {
  constructor(maxConnectionAllowed = 1, windowSizeInMinutes = 1, clock) {
    this.config = {
      maxConnectionAllowed,
      windowSizeInMinutes,
      clock
    }
    this.connections = new Map()
  }

  connect(ip) {
    const invocation = this.addIfMissing(ip);
    return this.windowHasPassed(invocation) ?
      this.removeInvocationAndTryAgain(ip) :
      this.notExceddedConnections(ip);
  }

  removeInvocationAndTryAgain(ip) {
    this.connections.delete(ip);
    return this.connect(ip);
  }

  windowHasPassed(invocation) {
    return this.config.clock.getTime() - invocation.invocationTime > (this.config.windowSizeInMinutes * SECOND * MILLISECONDS_PER_SECOND);
  }

  notExceddedConnections(ip) {
    return this.connections.get(ip).counter.incrementAndGet() <= this.config.maxConnectionAllowed;
  }

  addIfMissing(ip) {
    if (!this.connections.has(ip)) {
      this.connections.set(ip, new Invocation(new Counter(), this.config.clock.getTime()));
    }
    return this.connections.get(ip);
  }
}