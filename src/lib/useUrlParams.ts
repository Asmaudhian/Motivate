import { useSearchParams } from 'react-router-dom';

function useUrlParams(key: string) {
    const [urlParams, setUrlParams] = useSearchParams();

    const param = urlParams.get(key) || '';

    function setParam(value: string) {
        if (value === '') {
            urlParams.delete(key)
        } else {
            urlParams.set(key, value)
        }
        const newUrlParams = new URLSearchParams(urlParams);
        setUrlParams(newUrlParams);
    }

    return [param, setParam] as const;
}

export default useUrlParams;
