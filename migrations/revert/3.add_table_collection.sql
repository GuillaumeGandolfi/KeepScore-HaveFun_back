-- Revert kshf:3.add_table_collection from pg

BEGIN;

ALTER TABLE collection
    ADD COLUMN own BOOLEAN NOT NULL DEFAULT NULL,
    ADD COLUMN active BOOLEAN NOT NULL DEFAULT NULL,
    ADD COLUMN user_id int REFERENCES "user"(id);

DROP TABLE user_has_collection;

COMMIT;
