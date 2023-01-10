
// // // Import the functions you need from the SDKs you need
//  var initializeApp = require("firebase/app");
// // var getAnalytics = require("firebase/analytics");

	
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBmfXIRWhHaAJTFeEMiVv4W-4f83YSFDCU",
//   authDomain: "olympiabrickwork.firebaseapp.com",
//   projectId: "olympiabrickwork",
//   storageBucket: "olympiabrickwork.appspot.com",
//   messagingSenderId: "27730982555",
//   appId: "1:27730982555:web:b210fae47e14910da3383e",
//   measurementId: "G-NSKR032206"
// };

// // // Initialize Firebase
//  const firebase = initializeApp(firebaseConfig);
// // // const analytics = getAnalytics(app);

   
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require("path");
const url = require('url');
const fs = require('fs');
const dir = 'public/img';
let imgNames = '';
imgNames = fs.readdirSync(dir);
app.use(express.static(__dirname + '/public'))
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
	res.setHeader(
		'Content-Security-Policy',
		"default-src 'self'; script-src 'self'; style-src 'self';	media-src 'none'; font-src 'self'; connect-src 'self'; img-src 'self'; frame-src 'self';"
	);
	res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
	let = lang = {};
	if (url.parse(req.url, true).query.lang === 'bg') {
		//bulgarian
		lang = {
			'about-us': 'За нас', 'material': 'Материал', 'brickwork': 'Тухлена зидария', 'blockwork': 'Блокова зидария ', 'gallery': 'Галерия',
			'contact': 'Контакти', 'phone': 'Телефон', 'email': 'Имейл', 'name': 'Име', 'message': 'Съобщение', 'submit': 'Изпрати',
			'about-us-text': `Ние сме малка семейна фирма с опит в зидарията над 12 години.
			Ние сме специализирани в изграждането на проекти с по-високо качество, където нашите управленски и занаятчийски умения могат да бъдат
			използвани най-ефективно за нашите клиенти.`, 'language': 'Езици'
		};
	} else {
		//english
		lang = {
			'about-us': 'About us', 'material': 'Material', 'brickwork': 'Brickwork', 'blockwork': 'Blockwork', 'gallery': 'Gallery',
			'contact': 'Contact', 'phone': 'Phone', 'email': 'Email', 'name': 'Name', 'message': 'Message', 'submit': 'Submit',
			'about-us-text': `We are a small family company with experience bricklaying over 12 years.
			We specialise in building, higher quality projects where our management and craftsmanship skills can be
			utilised most effectively for our clients.`, 'language': 'Language'
		};
	};

	ejs.renderFile('views/index.ejs', { imgNames: imgNames, lang: lang },
		{}, function (err, template) {
			if (err) {
				throw err;
			} else {
				res.end(template);
			}
		});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
