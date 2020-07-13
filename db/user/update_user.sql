update users 
set 
    username = $2,
    user_email = $3,
    user_image = $4,
    user_banner = $5
where 
    user_id = $1
returning *;
