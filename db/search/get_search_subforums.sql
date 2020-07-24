select
    su.subforum_user_id,
    su.subforum_id,
    su.user_id,
    s.subforum_id,
    s.subforum_name,
    s.subforum_img,
    s.description,
    s.cake_day
from subforums s
full join subforum_users su on (su.subforum_id = s.subforum_id and su.user_id = $2) 
where s.subforum_name ilike '%' || $1 || '%'
order by s.subforum_id desc;