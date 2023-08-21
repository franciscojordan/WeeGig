import { Loader } from '@googlemaps/js-api-loader';
import credentials from '../credentials';

let googleApiClient: any = null;

const loadGoogleMapsApiClient = async () => {
    if (googleApiClient) {
        return googleApiClient;
    }

    const loader = new Loader({
        apiKey: credentials.apiKey,
        version: 'weekly',
        libraries: ['places'],
    });

    googleApiClient = await loader.load();
    return googleApiClient;
};

export default loadGoogleMapsApiClient;