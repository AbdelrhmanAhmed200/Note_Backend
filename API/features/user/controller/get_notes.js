const getnotes = require('../models/Note_model')

exports.getNote = async (req, res)=>{
    try {
        const notes = await getnotes.find(
            {userId : req.user.userId},
            'title content status createdAt updatedAt _id'
        )

        if(!notes|| notes.length == 0){
            return res.status(404).json({
                message:'No notes found'
            })
        }


        
        return res.status(200).json({message : ' notes fetched successfully',
            notes
        })
    } catch (error) {   
        console.error(error);
        return res.status(500).json({
        message: 'Internal server error'
    })
        
    }
}