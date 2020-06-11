// remove elements with $pullAll
db.comments.update(
    { _id: id },
    { $pullAll: { likeByUserId: ['id need unlike'] } }
)
