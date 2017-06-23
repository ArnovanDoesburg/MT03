/*@ngInject;*/
export default function GoogleMapsService($resource) {

    const API_KEY = "AIzaSyA20Tv7r4c1HQMI-NhXuefbJBXWJzxQfzQ";

    return $resource("https://maps.googleapis.com/maps/api/geocode/json?latlng=:latlng&key=" + API_KEY, {latlng: "@latlng"}, {
        get: {
            cache: true,
            method: "GET"
        }
    });
}
