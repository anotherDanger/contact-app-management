import { Router } from 'express';

export const router = Router();

router.post('/user', (req, res) => {
    res.send('Hello World');
});

router.get('/protected', (req, res) => {
    console.log('Masuk ke /protected')
    res.redirect('http://localhost:5500/src/home.html');
})

router.post('/contact', (req, res) => {
    const {title, name, phone, email, address, description} = req.body;

    res.status(201).json({
        message: 'Success'
    })
})

router.get('/login', (req, res) => {

});