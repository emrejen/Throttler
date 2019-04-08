export default class Counter {
  constructor() {
    this.counter = 0;
  }

  incrementAndGet() {
    return ++this.counter;
  }
}