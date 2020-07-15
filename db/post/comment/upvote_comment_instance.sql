insert into comment_votes 
(
    user_id,
    comment_id,
    upvote,
    downvote
) values 
(
    $1,
    $2,
    true,
    false
);