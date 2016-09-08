
Isomorphic React on Heroku for http://www.sffaudio.com/reading-short-and-deep/

A Node program that reads a Google Doc, serves up an rss feed, and builds a widget for [SFFaudio's Reading Short and Deep discussions](http://www.sffaudio.com/reading-short-and-deep/)

Install:
- $ npm install

Build:
- $ gulp all

Test:
- $ gulp verify

Launch:
- $ npm start

Load db ( user/pass ):
- http://localhost:5000/change    // choose 'next' continuously until back at change

View:
- http://localhost:5000/rsd/rss    === https://sffaudio.herokuapp.com/rsd/rss
- http://localhost:5000/rsd/table  === https://sffaudio.herokuapp.com/rsd/table
- http://localhost:5000/rsd/mobile === https://sffaudio.herokuapp.com/rsd/mobile


