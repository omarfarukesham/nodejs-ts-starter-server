
import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/user/user-create:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
userRouter.post('/user-create', validateRequest(UserValidation.userValidationSchema), userController.createUser);

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
userRouter.get('/:userId', userController.getSingleUser);

/**
 * @swagger
 * /api/user/{userId}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
userRouter.put('/:userId', userController.updateUser);

/**
 * @swagger
 * /api/user/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
userRouter.delete('/:userId', userController.deleteUser);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get a list of all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', userController.getUser);

export default userRouter;



//if you don't want to use swagger, you can uncomment the below code and comment the above code


// import { Router } from 'express'
// import { userController } from './user.controller'
// // import { USER_ROLE } from './user.constants'
// import validateRequest from '../../middlewares/validateRequest'
// import { UserValidation } from './user.validation'

// const userRouter = Router()

// userRouter.post('/user-create', validateRequest(UserValidation.userValidationSchema), userController.createUser)
// userRouter.get('/:userId', userController.getSingleUser)
// userRouter.put('/:userId', userController.updateUser)
// userRouter.delete('/:userId', userController.deleteUser)
// // userRouter.get('/',auth(USER_ROLE.admin, USER_ROLE.user), userController.getUser)
// userRouter.get('/', userController.getUser)

// export default userRouter
