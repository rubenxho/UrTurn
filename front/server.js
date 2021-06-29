const express = require('express');
const app = express();

app.use(express.static(_dirname + '/dist/urturn'))
app.get('/*',function(req,res){
    res.sendFile("index.html", {root:_dirname +'/dist/urturn'})
})

app.listen(process.env.PORT || 8080)


