const Note_model = require('../models/Note_model')
const user_model = require('../models/user_model')


exports.updateNote = async (req,res) =>{
    try {
        const existuser = await user_model.findOne(
            {_id : req.user.userId},
        )

        if(!existuser){
           return res.status(404).json({message:'wrong token'})
        }
        const taskId = req.params.id;


        const existTask = await Note_model.findOne({
            _id : taskId,
            userId:req.user.userId

        })

        if(!existTask){
            return res.status(404).json({message:'task not found'})
        }

        let { title, content , statuss } = req.body;
        if (!title || !content) {

            return res.status(400).json({
                message: 'title and content are required',
      });
    }
        if(statuss=== undefined){
            statuss = "pending"
        }

        const updateobj = {
            title:title,
            status : statuss,
            content:content
        };
        const updateNote = await Note_model.updateOne({_id : existTask._id},{$set: updateobj})
        if (!updateNote.acknowledged) {
            return res.status(500).json({ message: 'Failed to update task' });
        }
        if (updateNote.matchedCount === 0) {
            return res.status(404).json({ message: 'Task not found (no match for update)' });
        }

    return res
      .status(200)
      .json({ message: 'task updated successfully'});


        


        
    } catch (error) {
        console.error('updateFamilyTask error:', error);
        if (error && error.status) return res.status(error.status).json({ message: error.message });
        return res.status(500).json({ message: error.message || 'Internal server error' });
        
    }
}