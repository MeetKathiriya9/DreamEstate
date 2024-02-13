import express from 'express'
import { authcontroller, google, loginauthcontroller } from '../Controller/auth.controller.js';

const router = express.Router();

router.post("/insert",authcontroller)
router.post("/login",loginauthcontroller)
router.post("/google",google)

export default router