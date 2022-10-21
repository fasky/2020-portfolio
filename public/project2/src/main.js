const app = new Vue({
	el: '#app',
	data: {
        copyrightYear: "2019",
        copyrightName: "Kyle Fasanella",
        title: "US National Parks",
        numResults: 14,
        state: "AZ",
        mymap: '',
        layer: '',
        status:'Loading...',
        layerLabels: '',
        isHidden:'',
        markers: '',
        wetmap: 'precipitation_new',
        markerIcon: '',
        clickedLink:'',
        wetLayer: '',
        redIcon: '', 
        greenIcon: '', 
        blackIcon:'', 
        greyIcon: '', 
        violetIcon: '', 
        orangeIcon: '', 
        whiteIcon: '', 
        yellowIcon: '',
        nearwhiteIcon:'', 
        lightgreyIcon: '', 
        lightblackIcon: '',
        greyblueIcon: '', 
        greenblueIcon: '', 
        blueIcon: '',
        bluegreyIcon: '',
        dataType: '',
        searchTerm:'',
        firstLoad: '',
        loadingState:'https://raw.githubusercontent.com/fasky/Images/master/loading.png',
        loadingUrl:[
            {data: 'https://raw.githubusercontent.com/fasky/Images/master/loading.png'},
            {data: 'https://raw.githubusercontent.com/fasky/Images/master/loaded.png'}
        ],
        iconDesc:[
            {data: 'Battlefield'},
            {data:'Trail'},
            {data:'Nat. Park'},
            {data:'Monument'},
            {data:'Hist. Site'},
            {data:'Rec. Area'},
            {data:'Other'},
            {data:'Lake'},
            {data:'Cemetery'},
            {data:'Memorial'},
            {data:'Park'},
            {data:'Preserve'},
            {data:'Parkway'},
            {data:'River'},
            {data:'Seashore'}
        ],
        forecastDesc:[
            {data:'Thunderstorm'},
            {data:'Clear'},
            {data:'Cloudy'},
            {data:'Rainy'},
            {data:'Snowy'},
            {data:'Fog/Mist/Other'}
        ],
        forecastUrls:[
            {data: 'https://openweathermap.org/img/w/11d.png'},
            {data: 'https://openweathermap.org/img/w/01d.png'},
            {data: 'https://openweathermap.org/img/w/03d.png'},
            {data: 'https://openweathermap.org/img/w/09d.png'},
            {data: 'https://openweathermap.org/img/w/13d.png'},
            {data: 'https://openweathermap.org/img/w/50d.png'}
        ],
        iconUrls:[
            {data:'https://raw.githubusercontent.com/fasky/Images/master/Icons/red.png'},
            {data:'https://raw.githubusercontent.com/fasky/Images/master/Icons/green.png'},
            {data:'https://raw.githubusercontent.com/fasky/Images/master/Icons/black.png'},
            {data:'https://raw.githubusercontent.com/fasky/Images/master/Icons/mid-grey.png'},
            {data:'https://raw.githubusercontent.com/fasky/Images/master/Icons/purple.png'},
            {data: 'https://raw.githubusercontent.com/fasky/Images/master/Icons/orange.png'},
            {data: 'https://raw.githubusercontent.com/fasky/Images/master/Icons/white.png'},
            {data: 'https://raw.githubusercontent.com/fasky/Images/master/Icons/yellow.png'},
            {data: 'https://raw.githubusercontent.com/fasky/Images/master/Icons/near-white.png'},
            {data: 'https://raw.githubusercontent.com/fasky/Images/master/Icons/light-grey.png'},
            {data: 'https://raw.githubusercontent.com/fasky/Images/master/Icons/light-black.png'},
            {data:'https://raw.githubusercontent.com/fasky/Images/master/Icons/grey-blue.png'},
            {data:'https://raw.githubusercontent.com/fasky/Images/master/Icons/green-blue.png'},
            {data:'https://raw.githubusercontent.com/fasky/Images/master/Icons/blue.png'},
            {data: 'https://raw.githubusercontent.com/fasky/Images/master/Icons/blue-grey.png'}
        ],
        sortType:'nameSortAsc',
        result:[{
            data:
            {
                name: 'default',
                symbol: 'DEF',
                price: '40'
            }
        }],
        weatherResult:[{
            data:
            {
                name: 'default',
                symbol: 'DEF',
                price: '40'
            }
        }]
	},
    computed:{
        //sorts
        designationSortAsc: function(){
            function compare(a,b){
                if(a.designation < b.designation){
                    return -1;
                }
                if(a.designation > b.designation){
                    return 1;
                }
                return 0;
            }
            
            return this.result.data.sort(compare);
        },
        designationSortDesc: function(){
            function compare(a,b){
                if(a.designation > b.designation){
                    return -1;
                }
                if(a.designation < b.designation){
                    return 1;
                }
                return 0;
            }
            
            return this.result.data.sort(compare);
        },
        nameSortAsc: function(){
            function compare(a,b){
                if(a.name < b.name){
                    return -1;
                }
                if(a.name > b.name){
                    return 1;
                }
                return 0;
            }
            
            return this.result.data.sort(compare);
        },
        nameSortDesc: function(){
            function compare(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(a.name < b.name){
                    return 1;
                }
                return 0;
            }
            return this.result.data.sort(compare);
        }
    },
    mounted(){
        this.init()
    },
	methods:{
        init(){
            this.firstLoad = true;
            //set up map and layers
            this.mymap = L.map('mapid').setView([36.1, -112.1], 13);
            this.mapSetup();
            //set up markers
            this.markerIcon = L.Icon.extend({
                options:{
                    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
                    iconSize:     [48, 48],
                    shadowSize:   [41, 41],
                    iconAnchor:   [24, 48],
                    shadowAnchor: [13, 48],
                    popupAnchor:  [0, -45]
                }
            });
            this.redIcon = new this.markerIcon({iconUrl: this.iconUrls[0].data});
            this.greenIcon= new this.markerIcon({iconUrl:this.iconUrls[1].data}); 
            this.blackIcon= new this.markerIcon({iconUrl:this.iconUrls[2].data});
            this.greyIcon= new this.markerIcon({iconUrl:this.iconUrls[3].data}); 
            this.violetIcon= new this.markerIcon({iconUrl:this.iconUrls[4].data}); 
            this.orangeIcon= new this.markerIcon({iconUrl: this.iconUrls[5].data});
            this.whiteIcon= new this.markerIcon({iconUrl: this.iconUrls[6].data}); 
            this.yellowIcon= new this.markerIcon({iconUrl: this.iconUrls[7].data});
            this.nearwhiteIcon= new this.markerIcon({iconUrl:this.iconUrls[8].data}); 
            this.lightgreyIcon= new this.markerIcon({iconUrl: this.iconUrls[9].data}); 
            this.lightblackIcon= new this.markerIcon({iconUrl: this.iconUrls[10].data});
            this.greyblueIcon= new this.markerIcon({iconUrl: this.iconUrls[11].data});
            this.greenblueIcon= new this.markerIcon({iconUrl: this.iconUrls[12].data}); 
            this.blueIcon= new this.markerIcon({iconUrl: this.iconUrls[13].data});
            this.bluegreyIcon= new this.markerIcon({iconUrl: this.iconUrls[14].data});

            let storedTerm = localStorage.getItem('searchTermLast');
            if(storedTerm){
                this.searchTerm = storedTerm;
            }
            else{
                this.searchTerm = '';
            }
            
            //finally search
            this.search();
            
        },
        mapSetup(){
            this.layer = L.esri.basemapLayer('NationalGeographic').addTo(this.mymap);
            this.markers = L.layerGroup().addTo(this.mymap);
            this.wetLayer = L.tileLayer('https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={api_key}',{
                layer: 'precipitation_new',
                api_key: '2a64a8928af0262b887ef23baa0ed34c'
            }).addTo(this.mymap);  
        },
        search(){
            this.status = "Loading...";
            this.loadingState = this.loadingUrl[0].data;
            fetch("./src/get-data.php?limit=" + this.numResults + "&stateCode=" + this.state)
            //of9vJt1PZRwnxTuz2CMsa47f3SIO0LA8NAJGvoJu - np api key
            //check if working
//                .then(res => res.text())          // convert to plain text
//                .then(text => console.log(text))  // then log it out
            .then(response => {
                if(!response.ok){
                    this.status = "Try another search";
                    throw Error(`ERROR: ${response.statusText}`);
                }
                return response.json();
            })
            .then(json => {	
                this.result = json;
                this.updateMap();
                this.loadingState = this.loadingUrl[1].data;
                this.dataType = 'stateSelection';
                if(this.firstLoad == false){
                    this.writeData();
                }
                else{
                    this.firstLoad = false;
                }
                //console.log(this.result);
                this.status = this.result.data.length + " Results";
            });
        }, // end search
        
        //use search term for specific search
        searchByName(){
            this.status = "Loading...";
            this.dataType = 'searchedTerm';
            this.state = this.searchTerm;
            localStorage.setItem('searchTermLast',this.searchTerm);
            this.loadingState = this.loadingUrl[0].data;
            let splitTerm = this.searchTerm.split(' ');
            let formattedSearchTerm = splitTerm[0];
            for(let j = 1; j < splitTerm.length; j++){
                formattedSearchTerm += "_" + splitTerm[j];
            }
            fetch("./src/get-data.php?limit=" + this.numResults + "&searchTerm=" + formattedSearchTerm)
            .then(response => {
                if(!response.ok){
                    this.status = "Try another search";
                    throw Error(`ERROR: ${response.statusText}`);
                }
                return response.json();
            })
            .then(json => {	
                this.result = json;
                this.updateMap();
                this.loadingState = this.loadingUrl[1].data;
                this.writeData();
                this.status = this.result.data.length + " Results";
            });
        }, // end search term search
        
        updateMap(){
            //console.log("updating map");
            //clear markers
            this.markers.clearLayers();
            for(let item of this.result.data){
                //regex for lat long data              
                let latLongReg = /lat:(-?\d*\.\d*), long:(-?\d*\.\d*)/;
                if(item.latLong != ""){
                    let latLong = latLongReg.exec(item.latLong);
                    let popupContent = L.popup();
                    popupContent.setLatLng([latLong[1], latLong[2]]).setContent('<h4>'+item.name+'</h4><p>' + item.description + '</p>').openOn(this.mymap);
                    
                    //decide color marker based on designation
                    switch(item.designation){
                        case "National Park":
                        case "National Park & Preserve":
                        case "Park":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.blackIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        case "National Monument":
                        case "National Monument & Preserve":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.greyIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        case "National Preserve":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.greyblueIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        case "National Historic Site":
                        case "National Historical Site":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.violetIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        case "National Historic Park":
                        case "National Historical Park":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.lightblackIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        case "National Memorial":
                        case "Memorial":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.lightgreyIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        case "National Battlefield":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.redIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        case "National Cemetery":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.nearwhiteIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        case "National Recreation Area":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.orangeIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        case "National Seashore":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.bluegreyIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        case "National Lakeshore":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.yellowIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        case "National River":
                        case "National Recreational River":
                        case "Wild River":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.blueIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        case "National Parkway":
                        case "Memorial Parkway":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.greenblueIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        case "National Historic Trail":
                        case "National Historical Trail":
                        case "National Scenic Trail":
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.greenIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                        default:
                            L.marker([latLong[1], latLong[2]], {autoPan: false,icon:this.whiteIcon}).addTo(this.markers).bindPopup(popupContent).openPopup();
                            break;
                    }
                }        
            } //end for item
            
        },//end updatemap
        getCurrentWeather(item){
            //regex for lat long data
            let latLongReg = /lat:(-?\d*\.\d*), long:(-?\d*\.\d*)/;
            if(item.latLong != ""){
                let latLong = latLongReg.exec(item.latLong);
                //weather stuff - fetch - display later
                fetch('https://api.openweathermap.org/data/2.5/weather?appid=2a64a8928af0262b887ef23baa0ed34c&lat='+ latLong[1] +'&lon=' + latLong[2]).then(res => {
                     return res.json();
                }).then(function(res) {
                    Vue.set(item,'currentWeatherData',res.weather[0].main);
                    Vue.set(item,'currentTempData',(Math.round((res.main.temp-273.15)*1.8)+32) + '&deg;' + 'F');
                    switch(item.currentWeatherData){
                        case 'Thunderstorm':
                            Vue.set(item,'forecastUrl', app.forecastUrls[0].data);
                            break;
                        case 'Clear':
                            Vue.set(item,'forecastUrl', app.forecastUrls[1].data);
                            break;
                        case 'Clouds':
                            Vue.set(item,'forecastUrl', app.forecastUrls[2].data);
                            break;
                        case 'Rain':
                            Vue.set(item,'forecastUrl', app.forecastUrls[3].data);
                            break;
                        case 'Snow':
                            Vue.set(item,'forecastUrl', app.forecastUrls[4].data);
                            break;
                        case 'Drizzle':
                            Vue.set(item,'forecastUrl', app.forecastUrls[3].data);
                            break;
                        default:
                            Vue.set(item,'forecastUrl', app.forecastUrls[5].data);
                            break;
                    }
                });
            }
            else{
                Vue.set(item,'currentTempData','N/A');
            }
        },
        setBasemap(basemap) {
            if (this.layer) {
                this.mymap.removeLayer(this.layer);
            }

            this.layer = L.esri.basemapLayer(basemap);

            this.mymap.addLayer(this.layer);

            if (this.layerLabels) {
                this.mymap.removeLayer(this.layerLabels);
            }

            if (basemap === 'ShadedRelief' || basemap === 'Oceans' || basemap === 'Gray' || basemap === 'DarkGray' || basemap === 'Terrain')
            {
                this.layerLabels = L.esri.basemapLayer(basemap + 'Labels');
                this.mymap.addLayer(this.layerLabels);
            } else if (basemap.includes('Imagery')) {
                this.layerLabels = L.esri.basemapLayer('ImageryLabels');
                this.mymap.addLayer(this.layerLabels);
            }

            //weather redo when changing layers - own code
            if (this.wetLayer) {
                this.mymap.removeLayer(this.wetLayer);
            }

            if(this.wetmap != 'None'){
                this.wetLayer = L.tileLayer('https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={api_key}',{
                layer:this.wetmap,
                api_key: '2a64a8928af0262b887ef23baa0ed34c'
                }).addTo(this.mymap);
            }
            //weather api: 2a64a8928af0262b887ef23baa0ed34c
        },//endsetbasemap
        changeBasemap(basemaps){
            let basemap = basemaps.value;
            this.setBasemap(basemap);
        },
        //change weather on value change
        changeWeather(wetmaps){
            this.wetmap = wetmaps.value;
            if (this.wetLayer) {
                this.mymap.removeLayer(this.wetLayer);
            }

            if(this.wetmap != 'None'){
                this.wetLayer = L.tileLayer('https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={api_key}',{
                layer:this.wetmap,
                api_key: '2a64a8928af0262b887ef23baa0ed34c'
                }).addTo(this.mymap);
            }
        },
        sortParks(){
            switch(this.sortType){
                case 'nameSortAsc':
                    this.nameSortAsc;
                    break;
                case 'nameSortDesc':
                    this.nameSortDesc;
                    break;
                case 'designationSortAsc':
                    this.designationSortAsc;
                    break;
                case 'designationSortDesc':
                    this.designationSortDesc;
                    break;
                default:
                    break;
            }
        },
        linkClicked(name){
            this.dataType = "linkClick";
            this.clickedLink = name;
            this.writeData();
        },
        writeData(){
            let data;
            switch(this.dataType){
                case 'stateSelection':
                    data = {
                        name: this.state
                    };
                    refStates.push(data);
                    break;
                case 'linkClick':
                    data = {
                        name: this.clickedLink
                    };
                    refLinks.push(data);
                    break;
                case 'searchedTerm':
                    data = {
                        term: this.searchTerm
                    };
                    refTerms.push(data);
                    break;
                default:
                    break;
            }
        }
	} // end methods
});