import express from 'express';
import { MeetingController } from "../controllers/MeetingController";
import { checkAuthenticated } from '../middleware/middleware';

const router = express.Router();
const meetingController = new MeetingController();

router.get('/my-schedules', checkAuthenticated(["Admin", "Obreiro"]), (req, res) => {    
    meetingController.mySchedules(req,res)
});

router.post('/create', checkAuthenticated(["Admin"]), (req, res) => {    
    meetingController.create(req,res)
});

router.get('/get-all-calendar/:numberMonth', checkAuthenticated(["Admin", "Obreiro", "Membro"]),(req, res) => {    
    meetingController.getAllCalendar(req,res)
});

router.get('/get/:meetingId', checkAuthenticated(["Admin"]), (req, res) => {
    meetingController.getById(req, res);
});

router.put('/update/:meetingId', checkAuthenticated(["Admin"]), (req, res) => {
    meetingController.update(req, res);
});

router.delete('/delete/:meetingId', checkAuthenticated(["Admin"]), (req, res) => {
    meetingController.delete(req, res);
});

export {router};