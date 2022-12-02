// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiex5ISXAsHrBqb1Xu0enOgiPiCHeZkH0",
    authDomain: "restaurants-9c5d1.firebaseapp.com",
    projectId: "restaurants-9c5d1",
    storageBucket: "restaurants-9c5d1.appspot.com",
    messagingSenderId: "556426783393",
    appId: "1:556426783393:web:5b063d8ca25d0aefd11ee0",
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function getRestaurants(db) {
    const restaurantsCol = collection(db, "restaurants");
    const restaurantSnapshot = await getDocs(restaurantsCol);
    const restaurantList = restaurantSnapshot.docs.map((doc) => doc.data());
    return restaurantList;
}

const unsub = onSnapshot(collection(db, "restaurants"), (doc) => {
    // console.log(doc.docChanges());
    doc.docChanges().forEach((change) => {
        // console.log(change, change.doc.data(), change.doc.id);
        if (change.type === "added") {
            // Call render function in UI
            renderRestaurant(change.doc.data(), change.doc.id);
        }
        if (change.type === "removed") {
            // Call remove function in UI
            removeRestaurant(change.doc.id);
        }
    });
});

// Add new restaurant
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    addDoc(collection(db, "restaurants"), {
        name: form.name.value,
        state: form.state.value,
        town: form.town.value,
    }).catch((error) => console.log(error));
    form.name.value = "";
    form.state.value = "";
    form.town.value = "";
});

// Delete restaurant
const restaurantContainer = document.querySelector(".restaurants");
restaurantContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "I") {
        const id = event.target.getAttribute("data-id");
        deleteDoc(doc(db, "restaurants", id));
    }
});
