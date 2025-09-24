jest.mock('../../infrastructure/cache/redis', () => ({
  get: jest.fn(),
  set: jest.fn()
}));
jest.mock('../../infrastructure/repositories/characterFiltering', () => ({
  findById: jest.fn()
}));

const GetCharacterUseCase = require('../GetCharacterUseCase');
const cache = require('../../infrastructure/cache/redis');
const Repo = require('../../infrastructure/repositories/characterFiltering');

describe('GetCharacterUseCase', () => {
  beforeEach(() => jest.clearAllMocks());

  test('returns null when id not provided', async () => {
    cache.get.mockResolvedValue(null);
    Repo.findById.mockResolvedValue(null);

    const result = await GetCharacterUseCase.execute(undefined);
    expect(Repo.findById).toHaveBeenCalledWith(undefined);
    expect(cache.set).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  test('returns cached character when present', async () => {
    const cached = { id: 1, name: 'Rick' };
    cache.get.mockResolvedValue(cached);
    const result = await GetCharacterUseCase.execute(1);
    expect(result).toBe(cached);
    expect(Repo.findById).not.toHaveBeenCalled();
  });
});
