-- Deploy kshf:4.modify_transaction to pg

BEGIN;

ALTER TABLE transaction
    DROP COLUMN input,
    DROP COLUMN output,
    ADD COLUMN operation int NOT NULL;

ALTER TABLE user_quest
    DROP COLUMN accepted;

COMMIT;