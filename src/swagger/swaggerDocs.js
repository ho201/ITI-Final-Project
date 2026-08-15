/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication APIs
 *   - name: Medicines
 *     description: Medicine management APIs
 *   - name: Reminders
 *     description: Reminder management APIs
 *   - name: History
 *     description: Medicine dose history APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Hoda Hatem
 *               email:
 *                 type: string
 *                 format: email
 *                 example: hoda@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
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
 *                 example: hoda@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */

/**
 * @swagger
 * /medicines:
 *   post:
 *     summary: Add a new medicine
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - dosage
 *               - type
 *               - activeIngredient
 *             properties:
 *               name:
 *                 type: string
 *                 example: Panadol
 *               dosage:
 *                 type: string
 *                 example: 500mg
 *               type:
 *                 type: string
 *                 enum:
 *                   - capsule
 *                   - tablet
 *                   - cream
 *                   - drops
 *                   - syrup
 *                   - injection
 *                   - other
 *                 example: tablet
 *               description:
 *                 type: string
 *                 example: Pain relief medicine
 *               activeIngredient:
 *                 type: string
 *                 example: Paracetamol
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Medicine created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /medicines:
 *   get:
 *     summary: Get all medicines
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Medicines retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /medicines/{id}:
 *   get:
 *     summary: Get medicine by ID
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665abc123456789012345678
 *     responses:
 *       200:
 *         description: Medicine retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Medicine not found
 */

/**
 * @swagger
 * /medicines/{id}:
 *   put:
 *     summary: Update a medicine
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665abc123456789012345678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               dosage:
 *                 type: string
 *               type:
 *                 type: string
 *               description:
 *                 type: string
 *               activeIngredient:
 *                 type: string
 *     responses:
 *       200:
 *         description: Medicine updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Medicine not found
 */

/**
 * @swagger
 * /medicines/{id}:
 *   delete:
 *     summary: Delete a medicine
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665abc123456789012345678
 *     responses:
 *       200:
 *         description: Medicine deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Medicine not found
 */

/**
 * @swagger
 * /reminders:
 *   post:
 *     summary: Create a reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - medicineId
 *               - time
 *               - dosageQuantity
 *               - frequency
 *             properties:
 *               medicineId:
 *                 type: string
 *                 example: 665abc123456789012345678
 *               time:
 *                 type: string
 *                 example: "08:00"
 *               dosageQuantity:
 *                 type: string
 *                 example: "1 tablet"
 *               frequency:
 *                 type: string
 *                 enum:
 *                   - Daily
 *                   - Weekly
 *                   - Specific Days
 *                 example: Daily
 *               days:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                     - Saturday
 *                     - Sunday
 *                     - Monday
 *                     - Tuesday
 *                     - Wednesday
 *                     - Thursday
 *                     - Friday
 *                 example:
 *                   - Monday
 *                   - Wednesday
 *     responses:
 *       201:
 *         description: Reminder created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /reminders:
 *   get:
 *     summary: Get user's reminders
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reminders retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /reminders/{id}:
 *   patch:
 *     summary: Update a reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665abc123456789012345678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medicineId:
 *                 type: string
 *               time:
 *                 type: string
 *                 example: "08:00"
 *               dosageQuantity:
 *                 type: string
 *               frequency:
 *                 type: string
 *                 enum:
 *                   - Daily
 *                   - Weekly
 *                   - Specific Days
 *               days:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Reminder updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reminder not found
 */

/**
 * @swagger
 * /reminders/{id}:
 *   delete:
 *     summary: Delete a reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665abc123456789012345678
 *     responses:
 *       200:
 *         description: Reminder deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reminder not found
 */

/**
 * @swagger
 * /history:
 *   post:
 *     summary: Create dose history
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - medicineId
 *               - reminderId
 *               - status
 *             properties:
 *               medicineId:
 *                 type: string
 *                 example: 665abc123456789012345678
 *               reminderId:
 *                 type: string
 *                 example: 665abc123456789012345679
 *               status:
 *                 type: string
 *                 enum:
 *                   - Taken
 *                   - Missed
 *                 example: Taken
 *               takenAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-08-15T08:00:00.000Z
 *     responses:
 *       201:
 *         description: History created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Get user's dose history
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: History retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /history/{id}:
 *   patch:
 *     summary: Update dose history
 *     tags: [History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665abc123456789012345678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - Taken
 *                   - Missed
 *               takenAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: History updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: History not found
 */

