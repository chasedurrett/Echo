update users 
set 
    user_image = $2
where 
    user_id = $1
returning *;
