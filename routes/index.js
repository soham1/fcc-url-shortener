var express = require('express');
var router = express.Router();
var Url = require('../url');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

function handleRequest(req, res) {
    Url.findMax(function(err, object) {
        if (err) {
            res.json({
                'status': "Error"
            });
        }
        else {
            var url = new Url();
            var counter = 0;
            if(object){
                counter = object.counter + 1;
            }
            url.url = req.path.split("/new/")[1];
            url.shortUrl = "https://fcc-url-shortener-soham1.c9users.io/" + counter;
            url.counter = counter;
            url.save(function(err) {
                if (err) {
                    res.json({
                        'status': "fail"
                    });
                }
                else {
                    res.json({
                        'original_url': url.url,
                        'short_url': url.shortUrl
                    });
                }
            });
        }
    });

}

router.get(/\/new\/http:\/\//, function(req, res) {
    handleRequest(req, res);
});

router.get(/\/new\/https:\/\//, function(req, res) {
    handleRequest(req, res);
});

router.get(/\/new\/www/, function(req, res) {
    handleRequest(req, res);
});

router.get('/:counter', function(req, res) {
    Url.findOne({
        'counter': Number(req.params.counter)
    }, 'url', function(err, url) {
        if (err) {
            res.json({
                "status": "Error"
            });
        }
        else {
            res.redirect(url.url);
        }
    });
});

module.exports = router;
