insert into post_votes 
(
    user_id,
    post_id,
    upvote,
    downvote
) values 
(
    $1,
    $2,
    false,
    true
);