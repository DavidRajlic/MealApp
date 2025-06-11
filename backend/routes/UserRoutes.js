var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/profile_images' });

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Vrne seznam vseh uporabnikov
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Seznam uporabnikov
 */
router.get('/', UserController.list);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Vrne podatke enega uporabnika
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID uporabnika
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Podatki uporabnika
 */
router.get('/:id', UserController.show);

/**
 * @swagger
 * /users/review/{id}:
 *   get:
 *     summary: Vrne uporabnikova mnenja
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID uporabnika
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Podatki uporabnika
 */
router.get('/review/:id', UserController.getReviews);


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Prijava uporabnika
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: rajlic.david@gmail.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Prijava uspešna, vrne JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Napačno uporabniško ime ali geslo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wrong username or password
 *       500:
 *         description: Napaka na strežniku
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error when logging in
 */



router.post('/login', UserController.login);




/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registracija novega uporabnika
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirm:
 *                 type: string
 *               profile_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Uporabnik registriran
 */

router.post('/register', upload.single('profile_image'), UserController.signup);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Posodobi uporabnika
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID uporabnika
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               profile_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Uporabnik posodobljen
 */
router.put('/:id', upload.single('profile_image'), UserController.update);
/**
 * @swagger
 * /users/{id}/trust-status:
 *   put:
 *     summary: Update user's trust status
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - trustStatus
 *             properties:
 *               trustStatus:
 *                 type: integer
 *                 description: New trust status (1–5)
 *                 example: 3
 *     responses:
 *       200:
 *         description: Trust status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input or user not found
 *       500:
 *         description: Internal server error
 */

router.put('/:id/trust-status', UserController.updateTrustStatus);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Izbriši uporabnika
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID uporabnika
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Uporabnik izbrisan
 */
router.delete('/:id', UserController.remove);




module.exports = router;
