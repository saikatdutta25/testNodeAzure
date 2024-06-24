const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(helmet());
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // if you need to allow cookies or other credentials
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

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
            scriptSrc: ["'self'", "https://www.google.com", "https://www.gstatic.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
            fontSrc: ["'self'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
            connectSrc: ["'self'", "https://www.google.com", "https://wbcap-prod-api-college-test.azurewebsites.net", "https://devsecuredstorage.blob.core.windows.net", "https://devprabeshikastorage.blob.core.windows.net", "https://wbcap-api.azurewebsites.net", "https://apitest.wbcap.in", "https://api.wbcap.in", "https://wbcap-api-prod.azurewebsites.net", "https://wbcap-api-test.azurewebsites.net", "https://wbcap-api-test.azurewebsites.net", "https://pnrd-api-prod.azurewebsites.net", "https://stageai.wbcap.in", "https://ai.wbcap.in", "https://paymentgatewayservice.azurewebsites.net", "https://pg.wbcap.in", "https://report.wbcap.in", "http://repserver.applythrunet.co.in"],
            imgSrc: ["'self'", "https://www.gstatic.com", "https://devprabeshikastorage.blob.core.windows.net", "https://devsecuredstorage.blob.core.windows.net", "https://pnrdsurveyprodopen.blob.core.windows.net", "data:", "blob:"],
            frameSrc: ["'self'", 'https://maps.googleapis.com', "https://devprabeshikastorage.blob.core.windows.net", "https://devsecuredstorage.blob.core.windows.net", "https://wbcap-prod-api-college-test.azurewebsites.net", "https://www.google.com", "https://www.youtube.com", "https://wbcap-api.azurewebsites.net", "https://apitest.wbcap.in", "https://api.wbcap.in", "https://wbcap-api-prod.azurewebsites.net", "https://wbcap-api-test.azurewebsites.net", "https://wbcap-api-test.azurewebsites.net", "https://pnrd-api-prod.azurewebsites.net"],
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

app.use(express.static(__dirname + path.join('/home')));
app.get('*', (req, res) => {
    res.sendFile(__dirname + path.join('/home/index.html'));
});
// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

app.use(function (err, req, res, next) {
    // res.status(200).json({ status: err.status || 400, message: err.message })
    res.sendFile(__dirname + path.join('/maintain.html'));
})


// app.use(express.static('/home/site/wwwroot'));
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Server Started at port ${port}`)
});