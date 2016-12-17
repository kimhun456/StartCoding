var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');
var DB_handler = require('./routes/DB_handler');

var signIn = require('./routes/join');
var list = require('./routes/list');
var problem = require('./routes/problem');
var util = require('./routes/util');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.set('trust proxy', 1);
app.use(session({ secret: 'swmem2016',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:24*60*60*1000}
})); // session secret

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// public 소스들을 나타냄.
app.use('/images',express.static(path.join(__dirname, 'public/images')));
app.use('/js',express.static(path.join(__dirname, 'public/javascripts')));
app.use('/css',express.static(path.join(__dirname, 'public/stylesheets')));

// 라우터가 처리하는 부분.
//app.use('/', index);
app.use('/singIn', signIn);
app.use('/list', list);
app.use('/problem', problem);


app.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});


/*
 passport 설정 부분
 */


passport.use(new LocalStrategy({
        usernameField : 'id',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req,id, password, done) {

        var connection = DB_handler.connectDB();
        connection.query('SELECT * FROM learningC.user where id=?', id, function(err,rows){
            if (err) {
                console.error(err);
                throw err;
            }
            //console.log(rows[0]);
            if(rows.length > 0 ){
                //비번 체크
                console.log('pw check');
                if(password == rows[0].pw ){

                    var user = { 'id':rows[0].id,
                        'password':'',
                        'problems':rows[0].problems,
                        'percentage':rows[0].percentage};

                    req.logIn(user, function(err) {
                        if (err)
                            return next(err);
                        DB_handler.disconnectDB(connection);
                        return done(null,user);
                    });
                }

                else{
                    DB_handler.disconnectDB(connection);
                    return done(null,false);
                }

            }

            else{
                DB_handler.disconnectDB(connection);
                return done(null,false);
            }

        });

    }
));

// 인증 후, 사용자 정보를 Session에 저장함
passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user);
});

// 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
passport.deserializeUser(function(user, done) {
    //findById(id, function (err, user) {
    console.log('deserialize');
    done(null, user);
    //});
});


app.get('/login',
    function(req, res){

        console.log("/login GET ");

        if (req.isAuthenticated()) {
            console.log("Authntiucated");
            return res.redirect('/list');
        }else{
            console.log("unAuthntiucated");
            return res.render('login', { title: '로그인' });
        }
    });

//
// app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
//     res.redirect('/list');
// });


app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {

        console.log(user);

        var send = {
            state: 200
        };
        if(!user){ //id or password error
            send.state = 404;
        }

        return res.json(send);
    })(req, res, next);

});

app.get('/logout', function(req, res){
    console.log("logout");
    req.logout();
    res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
