const express = require('express')
const axios = require('axios')
const server= express();




 server.get('/api/search', (req, res) => {
    
       var query = req.query.query;
     
     axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
     .then(resp => {
        res.json(resp.data.results)
        console.log(resp.data.results)

     })
     .catch(err => {
         console.log(err)
     })   
 })
   


 



server.listen(3001, () => {
    console.log('escuchando en el puerto 3001')
})
