select 
u.user_id,
u.username,
u.user_image,
u.cake_day
from followers f 
inner join users u on f.user_id = u.user_id
where f.following_id = $1