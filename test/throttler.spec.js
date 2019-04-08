import { expect } from 'chai';
import Throttler from '../src/throttler';
import DateTimeConstants from '../src/DateTimeConstants';

//should accept connection by ip
//should refuse a connection from the same ip
//should allow a 2n connection from a differet ip
//should allow connection after window has passed

describe('Throttler test suite', () => {
  let throttler;
  let clock;
  const IP = '127.0.0.1';
  const OTHER_IP = '127.2.2.1';
  const MAX_CONNECTIONS_ALLOWED = 1;
  const WINDOW_SIZE_IN_MINUTES = 1;

  beforeEach(() => {
    Date.prototype.sleep = function (miliesToAdd) {
      this.setTime(this.getTime() + miliesToAdd);
    };
    clock = new Date();
    throttler = new Throttler(MAX_CONNECTIONS_ALLOWED, WINDOW_SIZE_IN_MINUTES, clock);
  });

  afterEach(() => {
    delete Date.prototype.sleep;
  });

  it('should not crach', () => {
    expect(() => { throttler }).not.to.throw();
  });

  it('should accept a connection', () => {
    expect(throttler.connect(IP)).to.be.true;
  });

  it('should refuse to accept a connection from the same ip', () => {
    expect(throttler.connect(IP)).to.be.true;
    expect(throttler.connect(IP)).to.be.false;
  });

  it('should accept a connection from a different IP', () => {
    expect(throttler.connect(IP)).to.be.true;
    expect(throttler.connect(OTHER_IP)).to.be.true;
  });

  it('should accept connection after time has passed', () => {
    expect(throttler.connect(IP)).to.be.true;
    clock.sleep(moreThenOneMinute(WINDOW_SIZE_IN_MINUTES));
    expect(throttler.connect(IP)).to.be.true;
  });

});

const moreThenOneMinute = (WINDOW_SIZE_IN_MINUTES) => DateTimeConstants.MILLIS_PER_MINUTE * WINDOW_SIZE_IN_MINUTES + 1
