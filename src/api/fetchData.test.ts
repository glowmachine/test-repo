import { fetchData } from "./fetchData";

describe('fetchData', () => {
    const filename = 'legislators-current.json';

    it('throws HTTP error when response is not ok', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue(
            {
                ok: false,
                status: 404,
            } as Response
        );
        await expect(fetchData(filename))
            .rejects.toThrow('HTTP Error Code: 404');
    });
    it('throws when JSON cannot be parsed', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue(
            {
                ok: true,
                json: () => Promise.reject(new SyntaxError(`Invalid JSON: ${filename}`)),
            } as Response
        );
        await expect(fetchData(filename))
            .rejects.toThrow(`Invalid JSON: ${filename}`);
    });
    it('throws when request times out', async () => {
        const timeoutError = new Error(`Fetch Timeout: ${filename}`);
        timeoutError.name = 'TimeoutError';
        vi.spyOn(globalThis, 'fetch').mockRejectedValue(
            timeoutError
        );
        await expect(fetchData(filename))
            .rejects.toThrow(`Fetch Timeout: ${filename}`);
    });
    it('rethrows any other error unchanged', async () => {
        const unknownError = new Error('Unknown Error');
        vi.spyOn(globalThis, 'fetch').mockRejectedValue(
            unknownError
        );
        expect(fetchData(filename))
            .rejects.toThrow('Unknown Error');
    });
    it('resolves with parsed JSON on success', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue(
            {
                ok: true,
                json: () => Promise.resolve({ id: 1, name: 'Alice' }),
            } as Response
        );
        const result = await fetchData(filename);
        expect(result).toEqual(({ id: 1, name: 'Alice' }));
    });
});