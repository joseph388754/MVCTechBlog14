const router = require("express").Router();
const { Post , User, Comment } = require("../../models");
const withAuth = require('../../utils/auth')

//Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((title) => title.get({ plain: true }));

        res.render('post', {
        posts,
        // Pass the logged in flag to the template
        logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Find all posts for logged in user
router.get('/dashboard', withAuth, (req, res) => {
    Post.findAll({
        where: {
        user_id: req.session.user_id
    },
        attributes: [
        'id',
        'text',
        'title',
        ],
        include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
        ]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, logged_in: true, username: req.session.username });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Find individual post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {id: req.params.id},
            attributes: ['id','title','text'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                    include: { model: User, attributes: ['username'] }
                },
                {
                    model: User,
                    attributes: ['username']
                }
                    ]
});

    const singlePost = postData.get({ plain: true });
    res.render('single', { singlePost, logged_in: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;