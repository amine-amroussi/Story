const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Static Folder 
app.use(express.static(path.join(__dirname, 'public')));
// BodyParser Middleware
app.use(bodyParser.urlencoded({extended : true}));

// sign up Route 
app.post('/signup', function(req, res){
    const { fname, lname, email } = req.body;

    // Construct req data
    const data = {
        members : [
            {
                email_address : email,
                status : 'subscribed',
                merge_fields: {
                    FNAME : fname,
                    LNAME : lname
                },
            },
        ],
    };

    const postData = JSON.stringify(data)

    const options = {
        url : 'https://us2.api.mailchimp.com/3.0/lists/1c4b00d1e3',
        method : 'POST',
        headers : {
            Authorization : 'auth 213dd7bf2842d2b7b690fbc544c7bbb8-us2'
        },
        body : postData
    }

    request(options, (err, response, body)=>{
        
        if (err){
            res.redirect('/faild.html');
        }else{
            if(response.statusCode === 200){
                res.redirect('/succes.html')
            }else {
                res.redirect('/fail.html')
            }
        }

        console.log(postData)
        
    });

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, function(){
    console.log(`Server start in ${PORT}`)
});