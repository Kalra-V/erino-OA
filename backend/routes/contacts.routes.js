import express from 'express'
import { getContacts, postContact, putContact, deleteContact } from '../controllers/contacts.controller.js';

const router = express.Router();

router.get("/", getContacts)
router.post("/", postContact)
router.put("/:id", putContact)
router.delete("/:id", deleteContact)

export default router;