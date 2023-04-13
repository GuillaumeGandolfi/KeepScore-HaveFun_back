-- Deploy kshf:7.modify_collection_2 to pg

BEGIN;

ALTER TABLE collection 
    ADD COLUMN require_level int;

ALTER TABLE "user"
    ADD COLUMN isAdmin BOOLEAN DEFAULT FALSE;

COMMIT;
