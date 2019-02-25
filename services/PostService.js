const router = require('express-promise-router')();
const axios = require('axios');
const postUrl = 'https://jsonplaceholder.typicode.com/todos/';


router.get('/all', (req, res) => {
    axios.get(postUrl)
        .then(result => {
            if(result) {
                res.status(200).json(result.data)
            }
        })
        .catch(err => {
            console.log(err)
        })
});

module.exports = router;