import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constants";
import { blogController } from "./blog.controller";
import { BlogValidation } from "./blog.validation";

const blogRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog management
 */

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       401:
 *         description: Unauthorized
 */
blogRouter.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(BlogValidation.blogValidationSchema),
  blogController.createBlog
);

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: List of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
blogRouter.get("/", blogController.getBlogs);
blogRouter.get("/latest", blogController.getLatestBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a single blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: Blog found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 */
blogRouter.get(
  "/id/:id",
  // auth(USER_ROLE.admin, USER_ROLE.user),
  blogController.getSingleBlog
);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a single blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: Blog found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 */
blogRouter.get("/slug/:slug", blogController.getBlogBySlug);

/**
 * @swagger
 * /api/blogs/{id}:
 *   patch:
 *     summary: Update a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */
blogRouter.patch(
  "/id/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  blogController.updateBlog
);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
blogRouter.delete(
  "/id/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  blogController.deleteBlog
);

export default blogRouter;

// import { Router } from 'express'
// import validateRequest from '../../middlewares/validateRequest'
// import { blogController } from './blog.controller'
// import { BlogValidation } from './blog.validation'
// import auth from '../../middlewares/auth'
// import { USER_ROLE } from '../user/user.constants'

// const blogRouter = Router()

// blogRouter.post('/', auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(BlogValidation.blogValidationSchema), blogController.createBlog)
// blogRouter.get('/:id', auth(USER_ROLE.admin, USER_ROLE.user), blogController.getSingleBlog)
// blogRouter.patch('/:id',auth(USER_ROLE.admin, USER_ROLE.user), blogController.updateBlog)
// blogRouter.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.user), blogController.deleteBlog)
// blogRouter.get('/',  blogController.getBlogs)

// export default blogRouter
