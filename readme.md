
Isomorphic-React-on-Heroku takes a [Google Sheet](https://docs.google.com/spreadsheets/d/17TwPecDRNw5JS9_WT6t3cl40e5M46z8ALwnvFalHDZc)
 and saves the data in a MongoDB database to produce [isomorphic Html/JavaScript](https://sffaudio.herokuapp.com/pdf/table) via Node.js which is then injected into a non-cached [WordPress page](http://www.sffaudio.com/public-domain-pdf-page/).

Here are all three media types: 

PDF [WordPress page](http://www.sffaudio.com/public-domain-pdf-page/) with injected [HTML/JavaScript](https://sffaudio.herokuapp.com/pdf/table)

RSD [WordPress page](http://www.sffaudio.com/reading-short-and-deep/) with injected [HTML/JavaScript](https://sffaudio.herokuapp.com/rsd/table)

Podcast [WordPress page](http://www.sffaudio.com/the-sffaudio-podcast/)  with injected [HTML/JavaScript](https://sffaudio.herokuapp.com/podcast/table)
    
 ![visual explanation](https://github.com/steenhansen/Isomorphic-React-on-Heroku/master/isometric-react.png)

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
