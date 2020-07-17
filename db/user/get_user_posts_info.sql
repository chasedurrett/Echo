select p.post_id, p.post_title, p.post_url, p.post_author_id, p.subforum_id, p.post_time, p.vote_tracker,
u.user_id, u.username, s.subforum_name, s.subforum_img
from posts p 
inner join users u on p.post_author_id = u.user_id
inner join subforums s on s.subforum_id = p.subforum_id
where u.user_id = $1