-- Revert kshf:4.modify_transaction from pg

BEGIN;

ALTER TABLE transaction
    DROP COLUMN operation,
    ADD COLUMN input int NOT NULL,
    ADD COLUMN output int NOT NULL;

ALTER TABLE user_quest
    ADD COLUMN accepted BOOLEAN NOT NULL DEFAULT FALSE;

COMMIT;
