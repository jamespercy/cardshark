var restify = require('restify');
var mongojs = require("mongojs");
 
var ip_addr = '127.0.0.1';
var port    =  '9000';
 
var server = restify.createServer({
    name : "cardshark"
});

var connection_string = '127.0.0.1:27017/cardshark';
var db = mongojs(connection_string, ['cardshark']);
var cards = db.collection("cards");
var PATH = '/cards';

server.get({path : PATH , version : '0.0.1'} , findAllCards);
server.get({path : PATH +'/:cardId' , version : '0.0.1'} , findCard);
server.post({path : PATH , version: '0.0.1'} ,postNewCard);
server.del({path : PATH +'/:cardId' , version: '0.0.1'} ,deleteCard);

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

function findAllCards(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    cards.find().limit(20).sort({postedOn : -1} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }else{
            return next(err);
        }
 
    });
 
}
 
function findCard(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    cards.findOne({_id:mongojs.ObjectId(req.params.cardId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }
        return next(err);
    })
}
 
function postNewCard(req , res , next){
    var card = {};
    card.title = req.params.title;
    card.postedOn = new Date();
 
    res.setHeader('Access-Control-Allow-Origin','*');
 
    cards.save(card , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(201 , Card);
            return next();
        }else{
            return next(err);
        }
    });
}
 
function deleteCard(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    cards.remove({_id:mongojs.ObjectId(req.params.cardId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(204);
            return next();      
        } else{
            return next(err);
        }
    })
 
}


 
server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});