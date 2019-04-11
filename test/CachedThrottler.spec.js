import { expect } from 'chai';
import CachedThrottler from '../src/CachedThrottler';

//allow connection from ip
//throttele connection from same ip for the 2nd time
//allow connection from different ip
//after window has passed - allow connection again

describe('CachedThrottler test suite', () => {
  let cachedThrottler;
  const IP = '127.0.0.1';
  const maxConnectionsAllowed = 1;
  const windowSizeInMinutes = 1;

  beforeEach(() => {
    cachedThrottler = new CachedThrottler(maxConnectionsAllowed, windowSizeInMinutes);
  });

  it('should allow connection after window has passed', () => {
    expect(cachedThrottler.connect(IP)).to.be.true;
    expect(false).to.be.a('string');
  });
});

