// Initialize Firebase
let config = {
apiKey: "AIzaSyDPsiPCudkCIw6tfq-s7uZSgLfHe7peRKs",
authDomain: "npmaps-2ffef.firebaseapp.com",
databaseURL: "https://npmaps-2ffef.firebaseio.com",
projectId: "npmaps-2ffef",
storageBucket: "npmaps-2ffef.appspot.com",
messagingSenderId: "992600895809"
};
firebase.initializeApp(config);

//database ref
let database = firebase.database();

//root references
let refTerms = database.ref('SearchTerms');
let refStates = database.ref('StateShows');
let refLinks = database.ref('LinkUsage');