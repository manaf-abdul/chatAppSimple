const router = require("express").Router();
const { default: strictTransportSecurity } = require("helmet/dist/middlewares/strict-transport-security");
const Chat = require("../models/Chats");
const Message = require("../models/Messages");

//add
router.post('/',async(req,res)=>{
    const newMesssage= new Message({
        conversationId:req.body.conversationId,
        sender:req.body.senderId,
        text:req.body.text
    });
    if(req.body.conversationId)
    try {
        const savedMessage=await newMesssage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
    else{
        try {
        const check=await Chat.findOne({
            members:{$all:[req.body.senderId,req.body.receiverId]}
        })
        if(check){
            const newMesssage=new Message({
                conversationId:check._id,
                sender:req.body.sender,
                text:req.body.text
            })
            const savedMessage=await newMesssage.save()
            res.status(200).json(savedMessage)
        }else{
            let stranger=true
            try {
                const newConversation =new Chat({
                members:[req.body.senderId,req.body.receiverId],
            })
                const savedConversation= await newConversation.save()
                res.status(200).json({savedConversation,stranger})
            } catch (err) {
                res.status(500).json(err)
            }
        }
            
        } catch (err) {
            res.status(500).json(err)
        }
    }
})

//get
router.get('/:conversationId',async(req,res)=>{
    try {
        const messages=await Message.find({conversationId:req.params.conversationId}).populate('sender','email username')
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(err)
    }
})



module.exports = router;
