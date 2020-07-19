select
    u.user_id,
    u.username,
    u.user_image
from users u
where u.username ilike '%' || $1 || '%'
order by u.user_id desc