const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');

const add = async (req, res) => {
    try {
        const meeting = new MeetingHistory({ ...req.body, createBy: req.user.userId });
        await meeting.save();
        res.status(200).json({ message: 'Meeting created successfully', meeting });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const index = async (req, res) => {
    try {
        const query = { ...req.query, deleted: false };
        const meetings = await MeetingHistory.find(query).populate('attendes attendesLead createBy');
        res.status(200).json({ meetings });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const view = async (req, res) => {
    try {
        const meeting = await MeetingHistory.findOne({ _id: req.params.id, deleted: false }).populate('attendes attendesLead createBy');
        if (!meeting) return res.status(404).json({ message: 'No Data Found.' });
        res.status(200).json(meeting);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const deleteData = async (req, res) => {
    try {
        const meeting = await MeetingHistory.findById(req.params.id);
        if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
        await MeetingHistory.updateOne({ _id: req.params.id }, { $set: { deleted: true } });
        res.status(200).json({ message: 'Meeting deleted successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body;
        await MeetingHistory.updateMany({ _id: { $in: ids } }, { $set: { deleted: true } });
        res.status(200).json({ message: 'Meetings deleted successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = { add, index, view, deleteData, deleteMany }