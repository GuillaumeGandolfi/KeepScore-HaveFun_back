-- Deploy kshf:6.modifiy_shop to pg

BEGIN;

ALTER TABLE shop 
    DROP COLUMN description,
    ADD COLUMN collection_id INT REFERENCES collection(id);
    


COMMIT;
