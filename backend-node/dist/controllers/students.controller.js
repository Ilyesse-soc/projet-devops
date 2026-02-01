"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getAllStudents = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAllStudents = async (req, res, next) => {
    try {
        const students = await prisma_1.default.student.findMany();
        res.json(students);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllStudents = getAllStudents;
const getStudentById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const student = await prisma_1.default.student.findUnique({ where: { id } });
        if (!student)
            return res.status(404).json({ error: 'Étudiant non trouvé' });
        res.json(student);
    }
    catch (err) {
        next(err);
    }
};
exports.getStudentById = getStudentById;
const createStudent = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, enrollmentDate } = req.body;
        const student = await prisma_1.default.student.create({
            data: { firstName, lastName, email, phone, enrollmentDate: new Date(enrollmentDate) }
        });
        res.status(201).json(student);
    }
    catch (err) {
        if (typeof err === 'object' && err !== null && 'code' in err) {
            if (err.code === 'P2002')
                return res.status(409).json({ error: 'Email déjà utilisé' });
        }
        next(err);
    }
};
exports.createStudent = createStudent;
const updateStudent = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { firstName, lastName, email, phone, enrollmentDate } = req.body;
        const student = await prisma_1.default.student.update({
            where: { id },
            data: { firstName, lastName, email, phone, enrollmentDate: new Date(enrollmentDate) }
        });
        res.json(student);
    }
    catch (err) {
        if (typeof err === 'object' && err !== null && 'code' in err) {
            if (err.code === 'P2025')
                return res.status(404).json({ error: 'Étudiant non trouvé' });
            if (err.code === 'P2002')
                return res.status(409).json({ error: 'Email déjà utilisé' });
        }
        next(err);
    }
};
exports.updateStudent = updateStudent;
const deleteStudent = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await prisma_1.default.student.delete({ where: { id } });
        res.status(204).send();
    }
    catch (err) {
        if (typeof err === 'object' && err !== null && 'code' in err) {
            if (err.code === 'P2025')
                return res.status(404).json({ error: 'Étudiant non trouvé' });
        }
        next(err);
    }
};
exports.deleteStudent = deleteStudent;
