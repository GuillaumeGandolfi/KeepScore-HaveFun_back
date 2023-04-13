-- Revert kshf:5.modify_collection from pg

BEGIN;

ALTER TABLE collection
    DROP COLUMN category;
COMMIT;
