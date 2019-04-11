import Counter from './Counter';

export default class Invocation {
  constructor(counter = new Counter(), invocationTime = Date.now()) {
    this.counter = counter;
    this.invocationTime = invocationTime;
  }
}