const router = require("express").Router();
const Chat = require("../models/Chats");

//new chat
router.post('/',async(req,res)=>{
    try {
        const newChat =new Chat({
        members:[req.body.senderId,req.body.receiverId],
    })
        const savedChat= await newChat.save()
        res.status(200).json(savedChat)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get chat of user
router.get('/:userId',async(req,res)=>{
    try {
        const chat= await Chat.find({
            members:{$in:[req.params.userId]}
        }).populate('members','email username')
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get chat of 2 users
router.get('/find/:firstUserId/:secondUserId',async (req,res)=>{
    try {
        const chat= await Chat.findOne({
            members:{$all:[req.params.firstUserId,req.params.secondUserId]}
        }).populate('members','name email')
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;
