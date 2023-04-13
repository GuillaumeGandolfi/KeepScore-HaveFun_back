-- Revert kshf:6.modifiy_shop from pg

BEGIN;

ALTER TABLE shop
    DROP COLUMN collection_id,
    ADD COLUMN description TEXT NOT NULL;
COMMIT;
