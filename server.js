const express = require('express');
const path = require('path');

const app = express();

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('dist/mapa'));
}

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'dist/mapa', 'index.html'));
});
app.listen(process.env.PORT || 8080);

