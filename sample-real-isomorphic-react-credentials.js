

/*
  A non-test sample credentials file which sits just outside the project. As MongoDB Atlas is cloud only, there is no local testing. 
  Thus the connection string is a has real values and must not be visible in the Git repo. View data with MongoDB Compass.

    Isomorphic-React-on-Heroku/
    real-isomorphic-react-credentials.js
    test-isomorphic-react-credentials.js
*/

var hidden_credentials = {

    ATLAS_MONGODB : "mongodb+srv://_A_REAL_USER_NAME_:_A_REAL_DB_PASSWORD_@cluster0.nbp4j.azure.mongodb.net/real_atlas_collection",   
    LOCALHOST_PORT: 5000,

    HTACCESS_USERNAME: '_A_REAL_HTACCESS_USER_',          //  user/pass to access http://localhost:5000/change
    HTACCESS_PASSWORD: '_A_REAL_HTACCESS_PASS_',

    THE_HOST_URL: 'http://sffaudio.herokuapp.com',
    TIME_ZONE_PUBLISH: 'MDT',

    RSD_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1VFMgWy6wmTkFIpeNW-NkZdWmpz5iZcuULgMpjn8_QgU/export?format=tsv",
    RSD_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1VFMgWy6wmTkFIpeNW-NkZdWmpz5iZcuULgMpjn8_QgU/export?format=tsv&gid=1799638635",       // real rsd

    PODCAST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1cWtA1AaY83cBuU_6vt64adDeR-dfT-X1U5VgvCRVMAg/export?format=tsv",   
    PODCAST_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1cWtA1AaY83cBuU_6vt64adDeR-dfT-X1U5VgvCRVMAg/export?format=tsv&gid=450982271",   // real podcast
                            
    PDF_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1sbQ8NR7hvcm4EjSlyhmte0rYtI_G3vnc1o5KLPAW2lc/export?format=tsv",          
    PDF_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1sbQ8NR7hvcm4EjSlyhmte0rYtI_G3vnc1o5KLPAW2lc/export?format=tsv&gid=1750187409"    // real pdf
};

module.exports = hidden_credentials;
