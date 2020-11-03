

/*
  A test sample credentials file which sits just outside the project. As MongoDB Atlas is cloud only, there is no local testing. 
  Thus the connection string is a has real values and must not be visible in the Git repo. View data with MongoDB Compass.
      
    Isomorphic-React-on-Heroku/
    real-isomorphic-react-credentials.js
    test-isomorphic-react-credentials.js
*/

var hidden_credentials = {

    ATLAS_MONGODB : "mongodb+srv://_A_TEST_USER_NAME_:_A_TEST_DB_PASSWORD_@cluster0.nbp4j.azure.mongodb.net/test_atlas_collection",   
    LOCALHOST_PORT: 5000,

    HTACCESS_USERNAME: 'user',          //  user/pass to access http://localhost:5000/change
    HTACCESS_PASSWORD: 'pass',

    THE_HOST_URL: 'localhost:5000',
    TIME_ZONE_PUBLISH: 'MDT',

    RSD_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/19SV8Dk5yc49gMBoUVSE6aGOigdTWJ0cgggFo3AdQl6Y/export?format=tsv",
    RSD_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/19SV8Dk5yc49gMBoUVSE6aGOigdTWJ0cgggFo3AdQl6Y/export?format=tsv&gid=1799638635",       // test rsd

    PODCAST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1DKkNYP_s5SU5uloXzX5JjOTEZquTlVbKurIGQTe3_Wk/export?format=tsv",   
    PODCAST_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1DKkNYP_s5SU5uloXzX5JjOTEZquTlVbKurIGQTe3_Wk/export?format=tsv&gid=607409390",   // test podcast
                            
    PDF_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/17TwPecDRNw5JS9_WT6t3cl40e5M46z8ALwnvFalHDZc/export?format=tsv",          
    PDF_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/17TwPecDRNw5JS9_WT6t3cl40e5M46z8ALwnvFalHDZc/export?format=tsv&gid=1750187409"    // test pdf
};
module.exports = hidden_credentials;
