
import app from 'firebase/app';
import 'firebase/auth';

const config = {
        apiKey: "API_KEY_HERE",
        authDomain: "APP_DOMAIN",
        databaseURL: "APP_URL",
        projectId: "APP_id",
        storageBucket: "APP_STORAGE",
        messagingSenderId: "1075291943989"
};

app.initializeApp(config);

export default app;
