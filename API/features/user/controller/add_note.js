const addNotes = require('../models/Note_model')

exports.addNote = async (req, res)=>{
    try {
        let {title, content} = req.body
        
        if(!title || !content){
            return res.status(400).json({
                message:'title and content required'
            })
        }
        const note = await addNotes.create({
            title,
            content,
            userId: req.user.userId
        })

        return res.status(201).json({message:'note added successful'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        message: 'Internal server error'
    })
        
    }
}