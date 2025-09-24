jest.mock('../../infrastructure/cache/redis', () => ({
  get: jest.fn(),
  set: jest.fn()
}));
jest.mock('../../infrastructure/repositories/characterFiltering', () => ({
  findByIds: jest.fn()
}));

const GetCharactersByIdsUseCase = require('../GetCharactersByIdsUseCase');
const cache = require('../../infrastructure/cache/redis');
const Repo = require('../../infrastructure/repositories/characterFiltering');

describe('GetCharactersByIdsUseCase', () => {
  beforeEach(() => jest.clearAllMocks());

  test('returns cached when present', async () => {
    const cached = [{ id: 2 }, { id: 3 }];
    cache.get.mockResolvedValue(cached);
    const res = await GetCharactersByIdsUseCase.execute([3,2]);
    expect(res).toBe(cached);
    expect(Repo.findByIds).not.toHaveBeenCalled();
  });

  test('sorts ids and calls repo when no cache', async () => {
    cache.get.mockResolvedValue(null);
    const repoRes = [{ id: 2 }, { id: 3 }];
    Repo.findByIds.mockResolvedValue(repoRes);

    const res = await GetCharactersByIdsUseCase.execute([3,2]);
    expect(Repo.findByIds).toHaveBeenCalledWith([2,3]);
    expect(cache.set).toHaveBeenCalled();
    expect(res).toBe(repoRes);
  });
  
});
