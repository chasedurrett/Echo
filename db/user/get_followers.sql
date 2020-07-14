select 
u.user_id,
u.username,
u.user_image,
u.cake_day
from followers f 
inner join users u on f.following_id = u.user_id
where f.user_id = $1