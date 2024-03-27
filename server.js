const express = require('express');
const app = express();
const port = 8080;
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
app.use(express.json());
app.use(cookieParser());
app.use(cookieSession({
  name: 'user_session', // name of the cookie

  // options
  httpOnly: true,
  sameSite: 'strict',

  // In a production environment you will sign your cookies using a private key or secret
  secret: 'somesuperimpressivestringofcharactersnoonewouldpossiblyguessmaybenotthatimpressiveiguess',

  // environmental variables to hide the value of the key when checking into source control
  // 'keys' is recommended to use instead of the 'secret' field
  // keys: [process.env.MY_PRIVATE_KEY],
  // secret: process.env.secret,
}))

app.post('/login', function (req, res, next) {
  // middleware makes the session cookie available and modifiable in the request as the 'session' prop

  // check credentials

    // set username to the session
    req.session.name = req.body.name;


  // add some other info to the session
  req.session.arbitraryStuff = "name set!";

  let coolData = (req.session.name);

  var opts = {
    maxAge: 900000,
    httpOnly: true,
    sameSite: 'strict',
  };

  // add a cookie to the response

  res.status(200).send(coolData).cookie();
})

app.get('/hello', function (req, res) {
  if (req.session.name !== undefined){
    res.status(200).send(`Hello ${req.session.name}!`)
  } else {
    res.status(403).send()
  }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))