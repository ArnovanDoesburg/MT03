/*@ngInject;*/
export default function NemoService($resource) {

    // De Nemo data komt binnen via een lokaal PHP bestand vanwege cross-origin resource sharing
    const NEMO_ACTIVITIES = "https://stud.hosted.hr.nl/0902237/MT03/nemo_proxy.php";

     return $resource(NEMO_ACTIVITIES, {
        get: {
            format: "JSON",
            method: "GET"
        }
     });
}

