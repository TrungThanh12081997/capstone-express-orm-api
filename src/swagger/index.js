/**
 * @swagger
 * /api/food/get-food:
 *  get:
 *      description: responses
 *      tags: [Food]
 *      responses:
 *          200: 
 *              description: success   
 */

/**
 * @swagger
 * /api/user/login:
 *  post:
 *      description: ghi chú
 *      parameters:
 *      - in: body
 *        name: login
 *        schema:
 *          type: object
 *          properties:
 *             email:
 *               type: string
 *             password:
 *               type: string              
 *      tags: [User]
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/v1/user/updateUser/{id}:
 *  put:
 *      description: responses
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: id
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *      responses:
 *          200: 
 *              description: res   
 */
