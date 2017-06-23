export default class Province {

    /**
     * Het Province object wordt gekopppeld aan het model van angular.
     * Dit zorgt ervoor dat je met een extra lijst en een status variabele gemakkelijk
     * extra functionaliteit kunt toevoegen aan de lijst aan de linkerkant of de kaart
     */
    constructor(name) {
        this.name = name;
        this.collapsed = false;
        this.events = [];

        this.audiences = [];
        this.selectedAudience = "all"; // Deze waarde wordt overschreven door de select box via ng-model
    }

    toggle() {
        this.collapsed = !this.collapsed;
        let title = document.querySelector(".province-list ." + this.name.toLowerCase());
        title.scrollIntoView();
    }

    /**
     * Voegt een evenement toe aan de Province zodat deze uitgelezen
     * kunnen worden in de html zodra de provincie naam overeenkomt met die van het JSON object.
     */
    addEvent(event) {
        for (let i = 0; i < event.provinces.length; i++) {
            const province = event.provinces[i];
            if (province.name === this.name) {
                this.events.push(event);
            }
        }
    }

    /**
     * Maakt een lijst aan van de beschikbare doelgroepen
     * Er wordt een Set gebruikt omdat dit object methodes die het de-dupliceren vergemakkelijkt
     * Dit is nodig omdat eroverheen geloopt wordt met ng-repeat
     */
    getAudienceList() {
        var audienceList = new Set();

        for (let i = 0; i < this.events.length; i++) {
            const audiences = this.events[i].audiences;
            for (let j = 0; j < audiences.length; j++) {
                const audience = audiences[j];
                if (!audienceList.has(audience.name)) {
                    audienceList.add(audience.name);
                }
            }
        }
        return [...audienceList];
    }

    /**
     * Filtert alle evenementen aan de hand van de geselecteerde doelgroep
     * De doelgroep wordt geselecteerd via het model
     * Zodra er een doelgroep is gekozen word er per evenement gekeken naar de doelgroep die vervolgens
     * ervoor zorgt dat de juiste evenementen in een aparte array komen
     */
    getFilteredEvents() {
        if (this.selectedAudience === 'all') {
            return this.events;
        } else {
            const filteredEvents = [];
            for (let i = 0; i < this.events.length; i++) {
                const audiences = this.events[i].audiences;

                for (let j = 0; j < audiences.length; j++) {
                    const audience = audiences[j];

                    if (audience.name.toLowerCase() === this.selectedAudience.toLowerCase()) {
                        filteredEvents.push(this.events[i]);
                    }
                }
            }
            return filteredEvents;
        }
    }

}
