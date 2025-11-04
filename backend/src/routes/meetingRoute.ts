import express from 'express';
import { MeetingController } from "../controllers/MeetingController";

const router = express.Router();
const meetingController = new MeetingController();

router.get('/my-schedules', (req, res) => {    
    meetingController.mySchedules(req,res)
});

router.post('/create', (req, res) => {    
    meetingController.create(req,res)
});

router.get('/get-all-calendar/:numberMonth', (req, res) => {    
    meetingController.getAllCalendar(req,res)
});

router.get('/get/:meetingId', (req, res) => {
    meetingController.getById(req, res);
});

router.put('/update/:meetingId', (req, res) => {
    meetingController.update(req, res);
});

router.delete('/delete/:meetingId', (req, res) => {
    meetingController.delete(req, res);
});

export {router};