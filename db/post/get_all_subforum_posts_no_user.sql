select distinct p.post_id, p.post_title, p.post_content, p.post_url, p.post_author_id, a.username as author_username, a.user_image as author_user_image, p.subforum_id, p.post_type_id, p.post_time, p.vote_tracker
from posts p 
join subforums s on s.subforum_id = p.subforum_id
join users a on a.user_id = p.post_author_id
where s.subforum_id = $1
order by p.post_id desc;