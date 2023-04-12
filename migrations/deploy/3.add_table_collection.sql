-- Deploy kshf:3.add_table_collection to pg

BEGIN;

ALTER TABLE collection
    DROP COLUMN own,
    DROP COLUMN active,
    DROP COLUMN user_id;


CREATE TABLE user_has_collection(
    collection_id int REFERENCES collection(id),
    user_id int REFERENCES "user"(id),
    active BOOLEAN DEFAULT NULL,
    PRIMARY KEY (collection_id, user_id)
);


COMMIT;