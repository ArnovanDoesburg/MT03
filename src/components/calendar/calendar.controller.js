import Province from "../../common/classes/Province.class.js";

export default class CalendarController {

    /**
     * De constructor haalt data op van de NemoService en kijkt of er gebruik kan worden gemaakt
     * van Geolocation services, die daarna de huidige provincie ophaalt
     */
    /*@ngInject;*/
    constructor(NemoService, GoogleMapsService) {
        this.NemoService = NemoService;
        this.GoogleMapsService = GoogleMapsService;
        this.provinces = [];
        this.provinceNames = ["Groningen", "Friesland", "Drenthe", "Overijssel", "Flevoland", "Gelderland", "Utrecht", "Noord-Holland", "Zuid-Holland", "Zeeland", "Noord-Brabant", "Limburg"];

        this.createProvinceList();

        // Nadat de data is opgehaald met een promise worden de evenementen opgestuurd naar het Province object
        // Elke provincie mag over alle evenementen heen loopen, omdat evenementen in meerdere provincies plaats kunnen vinden
        NemoService.get((data) => {

            this.addDataToProvinces(data.results);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((GeoPosition) => {
                    const param = {latlng: GeoPosition.coords.latitude + "," + GeoPosition.coords.longitude};
                    this.getProvinceFromGeoLocation(param);
                }, (PositionError) => {
                    // Hiermee kan gekeken worden of de geolocatie door de gebruiker is geweigerd
                    console.log(PositionError);
                });
            }

        });

    }


    /**
     * Maakt een nieuwe Province aan voor elke waarde in de provinces lijst.
     * De Province objecten bevatten functionaliteit om de evenementen te filteren en te tonen
     */
    createProvinceList() {
        const list = [];

        for (let i = 0; i < this.provinceNames.length; i++) {
            list.push(new Province(this.provinceNames[i]));
        }

        this.provinces = list;
    }

    /**
     * Voegt aan elke Province een event uit de Nemo API toe
     */
    addDataToProvinces(data) {

        for (let i = 0; i < this.provinces.length; i++) {
            const province = this.provinces[i];
            for (let j = 0; j < data.length; j++) {
                var event = data[j];
                province.addEvent(event);
            }
        }
    }

    /**
     * Klapt alle provincies in die op dit moment uitgeklapt zijn
     */
    contractAllProvinces() {
        for (let i = 0; i < this.provinces.length; i++) {
            if (this.provinces[i].collapsed === true) {
                this.provinces[i].toggle();
            }
        }
    }

    /**
     * Haalt met de Google Maps API informatie binnen over de huidige latlng locatie
     */
    getProvinceFromGeoLocation(param) {
        this.GoogleMapsService.get(param, (data) => {
            const results = data.results;

            angular.forEach(results, (value, key) => {
                const addressComponents = value["address_components"];
                const addressObject = addressComponents.find((component) => {
                    const name = component["long_name"];
                    return this.provinceNames.find((province) => {
                        return province === name;
                    });
                });

                if (addressObject !== undefined) {
                    // Zodra er een addressobject is, zoekt net zo lang tot er een provincie voorbij komt
                    this.toggleProvince(addressObject["long_name"]);
                    return;
                }

            });
        });

    }

    /**
     * Klap de provincie uit die als parameter meegestuurd word
     */
    toggleProvince(provinceName) {
        for (let i = 0; i < this.provinces.length; i++) {
            const province = this.provinces[i];
            if (province.name === provinceName) {
                province.toggle();
            }
        }
    }
}