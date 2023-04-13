BEGIN;

CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    password TEXT NOT NULL,
    level int NOT NULL DEFAULT 1,
    wallet int NOT NULL DEFAULT 50
);


CREATE TABLE family (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    level int NOT NULL
);

CREATE TABLE shop (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description TEXT NOT NULL,
    price int NOT NULL
);

CREATE TABLE collection (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description TEXT NOT NULL,
    own BOOLEAN NOT NULL DEFAULT NULL, -- 0 = ne possède pas / 1 = possède
    active BOOLEAN NOT NULL DEFAULT NULL, -- 0 = pas actif / 1 = actif
    user_id int REFERENCES "user"(id)
);

CREATE TABLE transaction (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    input int NOT NULL,
    output int NOT NULL,
    user_id int REFERENCES "user"(id)
);

CREATE TABLE quest (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description TEXT NOT NULL,
    difficulty int NOT NULL, -- 1 easy 2 medium 3 hard
    reward_exp int NOT NULL, -- valeur en expérience
    reward_coin int NOT NULL, -- valeur en or
    reward_item int REFERENCES collection(id)
);

CREATE TABLE user_has_family (
    user_id int REFERENCES "user"(id),
    family_id int REFERENCES family(id),
    date_joined TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, family_id)
);

CREATE TABLE user_has_friend (
    user_id int REFERENCES "user"(id),
    friend_id int REFERENCES "user"(id),
    date_joined TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, friend_id)
);

CREATE TABLE user_quest (
    user_id int REFERENCES "user"(id),
    quest_id int REFERENCES quest(id),
    accepted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id, quest_id)
);

COMMIT;