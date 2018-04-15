const express = require('express'); 
const morgan = require('morgan');
const path = require('path');
const app = express();
const beer = require('./beer.js')

app.use(express.static('public'));
app.use(morgan('tiny'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/videos', (req, res) => {
let videos = [
    {id: 1, comedian: "Judah Friedlander", title: "America is the Greatest Country in the United States", url: "https://www.netflix.com/watch/80208273?trackId=13752289&tctx=0%2C0%2C"},
    {id: 2, comedian: "Michael Che", title: "Micheal Che Matters", url: "https://www.netflix.com/watch/80049871?trackId=13752289&tctx=0%2C0%2C"},
    {id: 3, comedian: "Ali Wong", title: "Baby Cobra", url: "https://www.netflix.com/watch/80101493?trackId=13752290&tctx=1%2C1%2C"}
  ];

	res.render('videos/index', {videos: videos} );
})


app.get('/hello', (req, res) => {
	let data = { 
    message: 'Weeeeeee!',
    documentTitle: 'Comedy Videos!!',
    subTitle: 'Read some of the coolest comedy videos around.',
    showMore: true,
    comedians: ['John Mulaney', 'Michael Che', 'Maria Bamford'],
  }
	res.render('index',  data )
})

app.get('/beer', (req,res) => {
    res.render('beer/index', {beer: beer} );
})

app.get('/beer/:id', (req,res) => {
    let id = req.params.id;
    res.render('beer/show', beer[id-1])
})

app.get('/*', (res, req) => {
	req.status(404).sendfile('404-page/index.html', {root: 'public'});
	
})

app.listen(3000, () => {
    console.log("I am listening");
});