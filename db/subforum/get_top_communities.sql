select
    s.subforum_name,
    s.subforum_img,
    su.subforum_id,
    count(distinct su.user_id) as user_count
from subforums s join
    subforum_users su on s.subforum_id = su.subforum_id
group by s.subforum_id, su.subforum_id
order by user_count desc
limit 5;