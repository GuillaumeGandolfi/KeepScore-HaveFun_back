-- Revert kshf:2.add_unique_user from pg

BEGIN;

ALTER TABLE "user"
DROP CONSTRAINT unique_mail;

COMMIT;
