// controllers/user.controller.js
import sql from "../Database/db.js";

export const getUserCreation = async (req, res) => {
    try {
        const { userId } = req.auth();
        const creations = await sql`
            SELECT * FROM creation 
            WHERE user_id = ${userId} 
            ORDER BY created_at DESC
        `;
        res.status(200).json({
            success: true,
            creations
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

export const getPublicCreations = async (req, res) => {
    try {
        const creations = await sql`
            SELECT * FROM creation 
            WHERE publish = true 
            ORDER BY created_at DESC
        `;
        res.status(200).json({
            success: true,
            creations
        });
    } catch (error) {
        console.error('Get public creations error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

export const toggleLikeCreation = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.body;

        const creationArr = await sql`
            SELECT * FROM creation 
            WHERE id = ${id}
        `;
        const creation = creationArr[0];

        if (!creation) {
            return res.status(404).json({ 
                success: false,
                message: 'Creation not found' 
            });
        }

        const currentLikes = Array.isArray(creation.likes) ? creation.likes : [];
        const userIdStr = userId.toString();
       
        let updatedLikes;
        let message;

        if (currentLikes.includes(userIdStr)) {
            updatedLikes = currentLikes.filter(user => user !== userIdStr);
            message = 'Unlike successful';
        } else {
            updatedLikes = [...currentLikes, userIdStr];
            message = 'Like successful';
        }

        const formattedArray = `{${updatedLikes.join(',')}}`;
        
        await sql`
            UPDATE creation 
            SET likes = ${formattedArray}::text[]
            WHERE id = ${id}
            RETURNING *
        `;

        const updatedCreationArr = await sql`
            SELECT * FROM creation 
            WHERE id = ${id}
        `;
     
        res.json({
            success: true, 
            message: message, 
            creation: updatedCreationArr[0],
            likesCount: updatedLikes.length
        });
    } catch (error) {
        console.error('Toggle like error:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};