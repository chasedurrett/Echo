delete from comment_votes where comment_id in (select comment_id from comments where post_id = $1);
delete from comments where post_id = $1;
delete from post_votes where post_id = $1
delete from posts where post_id = $1