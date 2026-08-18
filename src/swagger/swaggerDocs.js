/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and authorization APIs
 *   - name: Medicines
 *     description: Medicine management APIs
 *   - name: Reminders
 *     description: Medication reminder management APIs
 *   - name: History
 *     description: Medication dose history APIs
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
 *                 maxLength: 100
 *                 example: Hoda Hatem
 *               email:
 *                 type: string
 *                 format: email
 *                 example: hoda@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email is already registered
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
 *                 minLength: 6
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get the current authenticated user's profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
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
 *         description: Admin access required
 */

/**
 * @swagger
 * /medicines:
 *   post:
 *     summary: Create a new medicine
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
 *     summary: Get the authenticated user's medicines
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *         example: 10
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search by medicine name or active ingredient
 *         example: Panadol
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - capsule
 *             - tablet
 *             - cream
 *             - drops
 *             - syrup
 *             - injection
 *             - other
 *         example: tablet
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - active
 *             - completed
 *             - suspended
 *         example: active
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
 *     summary: Get a medicine by ID
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
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - completed
 *                   - suspended
 *                 example: active
 *               description:
 *                 type: string
 *                 example: Pain relief medicine
 *               activeIngredient:
 *                 type: string
 *                 example: Paracetamol
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
 *     summary: Create a medication reminder
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
 *               - dosage
 *               - frequency
 *             properties:
 *               medicineId:
 *                 type: string
 *                 pattern: '^[0-9a-fA-F]{24}$'
 *                 example: 665abc123456789012345678
 *               time:
 *                 type: string
 *                 pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
 *                 example: "08:00"
 *               dosage:
 *                 type: object
 *                 required:
 *                   - quantity
 *                   - unit
 *                 properties:
 *                   quantity:
 *                     type: number
 *                     minimum: 0.1
 *                     exclusiveMinimum: true
 *                     example: 1
 *                   unit:
 *                     type: string
 *                     enum:
 *                       - tablets
 *                       - capsules
 *                       - ml
 *                       - mg
 *                       - drops
 *                       - puffs
 *                     example: tablets
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
 *               isActive:
 *                 type: boolean
 *                 default: true
 *                 example: true
 *     responses:
 *       201:
 *         description: Reminder created successfully
 *       400:
 *         description: Validation error or duplicate reminder
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /reminders:
 *   get:
 *     summary: Get the authenticated user's reminders
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
 *     summary: Update a medication reminder
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
 *               time:
 *                 type: string
 *                 pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
 *                 example: "09:30"
 *               dosage:
 *                 type: object
 *                 properties:
 *                   quantity:
 *                     type: number
 *                     minimum: 0.1
 *                     example: 2
 *                   unit:
 *                     type: string
 *                     enum:
 *                       - tablets
 *                       - capsules
 *                       - ml
 *                       - mg
 *                       - drops
 *                       - puffs
 *                     example: tablets
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
 *                   - Friday
 *               isActive:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Reminder updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Unauthorized to update this reminder
 *       404:
 *         description: Reminder not found
 */

/**
 * @swagger
 * /reminders/{id}:
 *   delete:
 *     summary: Delete a medication reminder
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
 *       403:
 *         description: Unauthorized to delete this reminder
 *       404:
 *         description: Reminder not found
 */

/**
 * @swagger
 * /history:
 *   post:
 *     summary: Create a medication history record
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
 *                 example: 2026-08-18T08:00:00.000Z
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
 *     summary: Get the authenticated user's medication history
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
 *     summary: Update a medication history record
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
 *                 example: Taken
 *               takenAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-08-18T08:00:00.000Z
 *     responses:
 *       200:
 *         description: History updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: History record not found
 */