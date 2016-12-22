
Isomorphic React on Heroku for: 

    http://www.sffaudio.com/reading-short-and-deep/
    https://sffaudio.herokuapp.com/rsd/table

    http://www.sffaudio.com/the-sffaudio-podcast/
    https://sffaudio.herokuapp.com/podcast/table

    http://www.sffaudio.com/public-domain-pdf-page/
    https://sffaudio.herokuapp.com/pdf/table
    
Install:

    $ npm install

Build:

    $ gulp all

Test:

    $ gulp test

    $ gulp jsx

    $ mocha

Launch:

    $ npm start

Load db ( user/pass ):

    http://localhost:5000/change    // choose 'next' continuously until back at change

View:

    http://localhost:5000/

    http://localhost:5000/rsd/rss    === https://sffaudio.herokuapp.com/rsd/rss

    http://localhost:5000/rsd/table  === https://sffaudio.herokuapp.com/rsd/table

    http://localhost:5000/rsd/mobile === https://sffaudio.herokuapp.com/rsd/mobile

Examples:

    https://sffaudio.herokuapp.com/rsd/table       // 44 records

    https://sffaudio.herokuapp.com/pdf/table       // 3919 records

    https://sffaudio.herokuapp.com/podcast/table   // 399 records
