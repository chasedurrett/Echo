insert into followers 
(
    user_id,
    following_id
) values 
(
    $1, 
    $2
)
returning *