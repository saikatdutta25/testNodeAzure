const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(helmet());
// app.use(cors());

// Custom header settings
app.use(helmet.hsts({
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true
}));

app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.google.com", "https://www.gstatic.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
            fontSrc: ["'self'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
            connectSrc: ["'self'", "https://www.google.com", "https://wbcap-api.azurewebsites.net", "https://stageai.wbcap.in", "https://paymentgatewayservice.azurewebsites.net", "http://repserver.applythrunet.co.in"],
            imgSrc: ["'self'", "https://www.gstatic.com", "https://devprabeshikastorage.blob.core.windows.net", "https://pnrdsurveyprodopen.blob.core.windows.net", "data:"],
            frameSrc: ["'self'", 'https://maps.googleapis.com', "https://www.google.com", "https://wbcap-api.azurewebsites.net"],
        },
    })
);
app.use(helmet({
    permissionsPolicy: {
        features: {
            fullscreen: ['self'],
            geolocation: ['self'],
            microphone: ['none'],
            camera: ['none']
        }
    }
}));


app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy({ policy: 'no-referrer-when-downgrade' }));
app.use(helmet.permittedCrossDomainPolicies());

app.use(express.static(__dirname + path.join('/home')));
app.get('*', (req, res) => {
    res.sendFile(__dirname + path.join('/home/index.html'));
});
// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

// console.log(__dirname + path.join('/abc'))
// app.use(express.static('/home/site/wwwroot'));
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Server Started at port ${port}`)
});