"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const students_controller_1 = require("../controllers/students.controller");
const router = (0, express_1.Router)();
router.get('/', students_controller_1.getAllStudents);
router.get('/:id', [(0, express_validator_1.param)('id').isInt()], students_controller_1.getStudentById);
router.post('/', [
    (0, express_validator_1.body)('firstName').isString().notEmpty().isLength({ max: 100 }),
    (0, express_validator_1.body)('lastName').isString().notEmpty().isLength({ max: 100 }),
    (0, express_validator_1.body)('email').isEmail().notEmpty().isLength({ max: 255 }),
    (0, express_validator_1.body)('phone').isString().notEmpty().isLength({ max: 20 }),
    (0, express_validator_1.body)('enrollmentDate').isISO8601().toDate()
], students_controller_1.createStudent);
router.put('/:id', [
    (0, express_validator_1.param)('id').isInt(),
    (0, express_validator_1.body)('firstName').isString().notEmpty().isLength({ max: 100 }),
    (0, express_validator_1.body)('lastName').isString().notEmpty().isLength({ max: 100 }),
    (0, express_validator_1.body)('email').isEmail().notEmpty().isLength({ max: 255 }),
    (0, express_validator_1.body)('phone').isString().notEmpty().isLength({ max: 20 }),
    (0, express_validator_1.body)('enrollmentDate').isISO8601().toDate()
], students_controller_1.updateStudent);
router.delete('/:id', [(0, express_validator_1.param)('id').isInt()], students_controller_1.deleteStudent);
exports.default = router;
