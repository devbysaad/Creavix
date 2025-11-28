// This MUST be the very first executable line to load environment variables 
// (like DATABASE_URL) from your .env file into process.env before 
// any other module (like db.js) tries to use them.
import 'dotenv/config'; 

import app from './src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});