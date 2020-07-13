select s.subforum_name, s.subforum_id, p.post_id, p.post_title, p.post_content, p.post_url, p.post_author_id, p.subforum_id, p.post_type_id, p.subforum_id, p.post_time, p.vote_tracker, a.user_id, a.username, a.user_image
from subforums s
join posts p on s.subforum_id = p.subforum_id
join users a on a.user_id = p.post_author_id
join subforum_users su on su.subforum_id = s.subforum_id
join users u on u.user_id = 1