import { MinuteSecondsPipe } from './minute-seconds.pipe';

describe('MinuteSecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new MinuteSecondsPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return "00:00" on input 0', () => {
    const pipe = new MinuteSecondsPipe();
    const sut = pipe.transform(0);
    expect(sut).toEqual('00:00');
  });
  it('should return "00:10" on input 10', () => {
    const pipe = new MinuteSecondsPipe();
    const sut = pipe.transform(10);
    expect(sut).toEqual('00:10');
  });
  it('should return "02:00" on input 120', () => {
    const pipe = new MinuteSecondsPipe();
    const sut = pipe.transform(120);
    expect(sut).toEqual('02:00');
  });
  it('should return "166:39" on input 9999', () => {
    const pipe = new MinuteSecondsPipe();
    const sut = pipe.transform(9999);
    expect(sut).toEqual('166:39');
  });
});
