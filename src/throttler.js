import Counter from './counter';
import Invocation from './invocation';
import DateTimeConstants from './DateTimeConstants';

export default class Throttler {

  constructor(maxConnections = 1, windowInMinutes = 1, clock = new Date()) {
    this.maxConnections = maxConnections;
    this.windowInMinutes = windowInMinutes;
    this.connections = new Map();
    this.clock = clock;
  }

  addInvocationIfMissing(key) {
    if (!this.connections.has(key)) {
      this.connections.set(key, new Invocation(new Counter(), new Date()));
    }
    return this.connections.get(key);
  }

  connect(key) {
    const invocation = this.addInvocationIfMissing(key);
    if (this.windowHasPassed(invocation)) {
      this.connections.delete(key);
      return this.connect(key);
    }
    return this.canConnectBy(key);
  }

  canConnectBy(key) {
    return this.connections.get(key).counter.incrementAndGet() <= this.maxConnections;
  }

  windowHasPassed(invocation) {
    return this.clock.getTime() - invocation.clock.getTime() > (this.windowInMinutes * DateTimeConstants.MILLIS_PER_MINUTE);
  }
}
