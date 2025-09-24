jest.mock('../../infrastructure/cache/redis', () => ({
	get: jest.fn(),
	set: jest.fn()
}));
jest.mock('../../infrastructure/repositories/characterFiltering', () => ({
	search: jest.fn()
}));

const SearchCharactersUseCase = require('../SearchCharactersUseCase');
const cache = require('../../infrastructure/cache/redis');
const Repo = require('../../infrastructure/repositories/characterFiltering');

describe('SearchCharactersUseCase', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('returns cached result when present', async () => {
		const cached = { items: [{ id: 1 }], total: 1 };
		cache.get.mockResolvedValue(cached);

		const result = await SearchCharactersUseCase.execute({ name: 'rick' }, { limit: 10 });
		expect(result).toBe(cached);
		expect(Repo.search).not.toHaveBeenCalled();
	});

	test('calls repo when no cache', async () => {
		cache.get.mockResolvedValue(null);
		const repoResult = { items: [{ id: 2 }], total: 1 };
		Repo.search.mockResolvedValue(repoResult);

		const result = await SearchCharactersUseCase.execute({}, { limit: 5 });
		expect(Repo.search).toHaveBeenCalledWith({}, { limit: 5 });
		expect(cache.set).toHaveBeenCalled();
		expect(result).toBe(repoResult);
	});


});
