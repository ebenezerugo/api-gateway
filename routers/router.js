const router = require('express-promise-router')();
const userRouter = require('../controllers/UserController');

const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

const PostService = require('../services/PostService');

router.use('/posts', passportJWT, PostService);
router.use('/user',userRouter);

module.exports = router