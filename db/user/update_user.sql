update users 
set 
    user_image = $2,
    user_banner = $3
where 
    user_id = $1
returning *;
