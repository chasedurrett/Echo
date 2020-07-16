select
    s.subforum_id,
    s.subforum_name,
    s.subforum_img
from subforum_users su
    join users u on su.user_id = u.user_id
    join subforums s on s.subforum_id = su.subforum_id
where su.user_id = $1;