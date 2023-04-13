-- Deploy kshf:5.modify_collection to pg

BEGIN;

ALTER TABLE collection
    ADD COLUMN category TEXT ;

COMMIT;
