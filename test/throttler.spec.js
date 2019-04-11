import {MILLISECONDS_PER_SECOND, SECOND} from 'time-constants';
import { expect } from 'chai';
import Throttler from '../src/Throttler';

//allow connection from ip
//throttele connection from same ip for the 2nd time
//allow connection from different ip
//after window has passed - allow connection again


class UberDate extends Date {
  waitFor(milis) {
    this.setTime(this.getTime() + milis);
  }
}
describe('Throttler test suite', () => {
  let throttler;
  let clock;
  const IP = '127.0.0.1';
  const OTHER_IP = '127.0.0.2';
  const maxConnectionsAllowed = 1;
  const windowSizeInMinutes = 1;

  function moreThenOneMinute() {
    return windowSizeInMinutes * MILLISECONDS_PER_SECOND * SECOND + 2000;
  }

  beforeEach(() => {
    clock = new UberDate();
    throttler = new Throttler(maxConnectionsAllowed, windowSizeInMinutes, clock);
  });

  it('should not crache', () => {
    expect(() => { new Throttler() }).not.to.throw;
    expect(throttler).to.be.instanceOf(Throttler);
  });

  it('should allow connection by ip', () => {
    expect(throttler.connect(IP)).to.be.true;
  });

  it('should throttle 2nd connection', () => {
    expect(throttler.connect(IP)).to.be.true;
    expect(throttler.connect(IP)).to.be.false;
  });

  it('should allow connection from diffent IP', () => {
    expect(throttler.connect(IP)).to.be.true;
    expect(throttler.connect(OTHER_IP)).to.be.true;
  });

  it('should allow connection after window has passed', () => {
    expect(throttler.connect(IP)).to.be.true;
    clock.waitFor(moreThenOneMinute());
    expect(throttler.connect(IP)).to.be.true;
  });
});

