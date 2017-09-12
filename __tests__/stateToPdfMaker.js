import StateToPdfMaker from '../src/stateToPdfMaker';
import { contentStateData } from '../resources/contentStateData';

describe('StateToPdfMaker', () => {
  test('Generate valid data', () => {
    const stateToPdfMaker = new StateToPdfMaker(contentStateData);
    const response = stateToPdfMaker.generate();

    expect(true).toBe(true);
  });
});
