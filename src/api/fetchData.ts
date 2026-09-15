export type Filename =
    | 'legislators-current.json'
    | 'legislators-social-media.json'
    | 'legislators-district-offices.json';
const baseUrl = 'https://unitedstates.github.io/congress-legislators';
const timeoutMs = 5000;

export async function fetchData<T>(filename: Filename): Promise<T> {
    try {
        const response = (import.meta.env.VITE_USE_MOCK_DATA === 'true')
            ? await fetch(
                `/uscl-viewer/tests/fixtures/${filename}`
            )
            : await fetch(
                `${baseUrl}/${filename}`,
                { signal: AbortSignal.timeout(timeoutMs) }
            );

        //Handle network error
        if (!response.ok) {
            throw new Error(`HTTP Error Code: ${response.status}`);
        }

        return await response.json();
    }
    catch (error) {
        //Handle other errors
        if (error instanceof SyntaxError) {
            throw new Error(`Invalid JSON: ${filename}`);
        }
        else if (error instanceof Error && error.name === 'TimeoutError') {
            throw new Error(`Fetch Timeout: ${filename}`);
        }
        else {
            throw error;
        }
    }
}