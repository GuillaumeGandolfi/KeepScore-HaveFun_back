-- Deploy kshf:2.add_unique_user to pg

BEGIN;

ALTER TABLE "user"
ADD CONSTRAINT unique_mail UNIQUE (mail);

COMMIT;
