const admin = new Vue({
	el: '#fireBase',
	data: {
        title:"User Analytics",
        terms:[
            {name: "No data yet!", count: 0}
        ],
        states:[
            {name: "No data yet!", count: 0}
        ],
        links:[
            {name: "No data yet!", count: 0}
        ]
    },
    computed:{
        sortedTerms: function() {
            return this.terms.sort((a, b) => { return b.count - a.count;});
        },
        sortedStates: function() {
            return this.states.sort((a, b) => { return b.count - a.count;});
        },
        sortedLinks: function() {
            return this.links.sort((a, b) => { return b.count - a.count;});
        }
    }
});

// #4 This is where the magic happens!
refTerms.on("value", termChanged, firebaseError);
refStates.on("value", statesChanged, firebaseError);
refLinks.on("value", linksChanged, firebaseError);

function termChanged(data){
    let obj = data.val();

    //clear items
    while(admin.terms.length > 0){
        admin.terms.pop();
    }

    for (let key of Object.keys(obj)){  // use for..in to interate through object keys
        let row = obj[key];
        let listedAlready = false;
        for(let exists of admin.terms){
            if(exists.name == row.term){
                exists.count++;
                listedAlready = true;
            }
        }
        if(!listedAlready){
            //add to items for display through vue
            admin.terms.push({name: row.term, count: 1});
        }
    }
}

function statesChanged(data){
    let obj = data.val();
    
    //clear items
    while(admin.states.length > 0){
        admin.states.pop();
    }

    for (let key of Object.keys(obj)){  // use for..in to interate through object keys
        let row = obj[key];
        let listedAlready = false;
        for(let exists of admin.states){
            if(exists.name == row.name){
                exists.count++;
                listedAlready = true;
            }
        }
        if(!listedAlready){
            admin.states.push({name: row.name, count: 1});
        }
        //add to items for display through vue
    }
}

function linksChanged(data){
    let obj = data.val();

    //clear items
    while(admin.links.length > 0){
        admin.links.pop();
    }

    for (let key of Object.keys(obj)){  // use for..in to interate through object keys
        let row = obj[key];
        let listedAlready = false;
        //add to items for display through vue
        for(let exists of admin.links){
            if(exists.name == row.name){
                exists.count++;
                listedAlready = true;
            }
        }
        if(!listedAlready){
            admin.links.push({name: row.name, count: 1});
        }
    }
}

function firebaseError(error){
    console.log(error);
}