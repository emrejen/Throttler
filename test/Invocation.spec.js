import { expect } from 'chai';
import Invocation from '../src/Invocation';

describe('Invocation test suite', () => {

  it('should be able to instansiate', () => {
    expect(new Invocation()).to.be.instanceOf(Invocation);
    expect(new Invocation().counter.counter).to.equal(0);
  });
});