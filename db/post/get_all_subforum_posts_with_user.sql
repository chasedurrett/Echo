select distinct p.post_id, p.post_title, p.post_content, p.post_url, p.post_author_id, p.subforum_id, p.post_type_id, p.subforum_id, p.post_time, p.vote_tracker, a.user_id, a.username, a.user_image, u.user_id, u.username, pv.upvote, pv.downvote
from posts p 
join subforums s on s.subforum_id = p.subforum_id
join users a on a.user_id = p.post_author_id
join post_votes pv on pv.post_id = p.post_id
join users u on u.user_id = $2
where s.subforum_id = $1;
