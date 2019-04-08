import { expect } from 'chai';
import Counter from '../src/counter';

describe('Counter testing', () => {
  let counter;
  beforeEach(() => {
    counter = new Counter();
  });
  it('should not crach', () => {
    expect(() => { new Counter() }).not.to.throw();
  });

  it('should be init with 0 counter', () => {
    expect(counter.counter).to.equal(0);
  });

  it('should increment', () => {
    expect(counter.counter).to.equal(0);
    expect(counter.incrementAndGet()).to.equal(1);
    expect(counter.incrementAndGet()).to.equal(2);
    expect(counter.counter).to.equal(2);
  });
});