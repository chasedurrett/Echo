select
    s.subforum_id,
    s.subforum_name,
    s.subforum_img,
    s.description,
    s.cake_day
from subforums s
where s.subforum_name ilike '%' || $1 || '%'
order by s.subforum_id desc