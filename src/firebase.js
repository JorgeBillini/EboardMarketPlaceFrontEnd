
import app from 'firebase/app';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyCxntuqEdhdVVWcg7KnVG8gJBJpM1rgvVM",
        authDomain: "eboardmarketplace.firebaseapp.com",
        databaseURL: "https://eboardmarketplace.firebaseio.com",
        projectId: "eboardmarketplace",
        storageBucket: "eboardmarketplace.appspot.com",
        messagingSenderId: "1075291943989"
};

app.initializeApp(config);

export default app;