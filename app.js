const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(helmet());
app.use(cors());

// Custom header settings
app.use(helmet.hsts({
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true
}));

app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            // defaultSrc: ["'self'"],
            // scriptSrc: ["'self'", "https://www.google.com", "https://www.gstatic.com"],
            // styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
            // fontSrc: ["'self'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
            // connectSrc: ["'self'", "https://www.google.com", "https://pnrdapi.azurewebsites.net", "https://pnrd-api-prod.azurewebsites.net", "https://paymentgatewayservice.azurewebsites.net", "http://repserver.applythrunet.co.in"],
            // imgSrc: ["'self'", "https://www.gstatic.com", "httxps://devprabeshikastorage.blob.core.windows.net", "https://pnrdsurveyprodopen.blob.core.windows.net", "data:"],
            // frameSrc: ["'self'", 'https://maps.googleapis.com', "https://www.google.com", "https://www.youtube.com", "https://pnrdapi.azurewebsites.net", "https://pnrd-api-prod.azurewebsites.net"],

            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://www.google.com", "https://www.gstatic.com"],
            styleSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
            fontSrc: ["'self'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
            connectSrc: ["'self'", "https://www.google.com", "https://pnrdapi.azurewebsites.net", "https://pnrd-api-prod.azurewebsites.net", "https://paymentgatewayservice.azurewebsites.net", "http://repserver.applythrunet.co.in"],
            imgSrc: ["'self'", "https://www.gstatic.com", "https://devprabeshikastorage.blob.core.windows.net", "https://pnrdsurveyprodopen.blob.core.windows.net", "data:"],
            frameSrc: ["'self'", 'https://maps.googleapis.com', "https://www.google.com", "https://www.youtube.com", "https://pnrdapi.azurewebsites.net", "https://pnrd-api-prod.azurewebsites.net"],
            objectSrc: ["'none'"] // Optionally restrict object sources
        },
    })
);


app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy({ policy: 'no-referrer-when-downgrade' }));
app.use(helmet.permittedCrossDomainPolicies());
app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'fullscreen=(self), geolocation=(self), camera=(), microphone=()');
    next();
});
// Add X-XSS-Protection header
app.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline'");
    next();
});

app.use(express.static(__dirname + path.join('/home')));
app.get('*', (req, res) => {
    res.sendFile(__dirname + path.join('/home/index.html'));
});
// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

app.use(function (err, req, res, next) {
    res.status(200).json({ status: err.status || 400, message: err.message })
})


// app.use(express.static('/home/site/wwwroot'));
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Server Started at port ${port}`)
});