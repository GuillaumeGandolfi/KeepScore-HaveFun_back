-- Revert kshf:7.modify_collection_2 from pg

BEGIN;

ALTER TABLE collection 
    DROP COLUMN require_level;
    

ALTER TABLE "user"
    DROP COLUMN isAdmin;

    
COMMIT;
