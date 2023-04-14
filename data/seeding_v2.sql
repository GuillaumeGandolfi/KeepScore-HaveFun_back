BEGIN;

TRUNCATE "user", quest, family, shop, collection, transaction, user_has_friend, user_has_collection, user_has_quest, user_has_shop RESTART IDENTITY;

INSERT INTO family(name,level)
VALUES ('teamdevback', 1),
('teamdevfront', 1);

INSERT INTO "user"(email,firstname,lastname,password, isAdmin, family_id )
VALUES ('echterhoff.a@gmail.com', 'echterhoff', 'alexandre', 'azerty', true, 1),
('guillaumegandolfi@gmail.com','guillaume', 'gandolfi', 'abcd', true, 1),
('abdelaziz@gmail.com', 'abdel', 'aziz', 'azerty', false, 2),
('peterMounier@gmail.com', 'peter', 'mounier', 'azerty', false, 2),
('sondes@gmail.com', 'sondes', 'nefzi', 'azerty', false, 2);



INSERT INTO user_has_friend(user_id, friend_id)
VALUES (1,2),(1,3),(1,4),(1,5),(2,5),(2,4),(2,3);

INSERT INTO quest(description, difficulty, reward_exp, reward_coin) VALUES 
('Mois sans tabac : nous te demanderons pas d arreter de fumer, mais diminue tes dépenses de moitié !', 3, 150, 150),
('C est la saint valentin, achète des fleurs a ta compagne', 1, 75, 75),
('Noel ! Fait attention a ton budget, mais ne néglige pas tes proches', 2, 100, 100),
('Le printemps est là ! profite en pour aller cueillir quelques fleurs et dire qu elles viennent du fleuriste :)', 1, 50, 50);

INSERT INTO collection (description, category) VALUES
('background vert','Theme'),
('background bleu','Theme'),
('background rouge','Theme'),
('Graphique camembert','Outil financier'),
('Police Impact','Police'),
('Police Roboto','Police');

INSERT INTO shop(price, collection_id) VALUES
(10, 1),
(10, 2),
(80, 3),
(30, 4),
(30, 5);

INSERT INTO user_has_collection(collection_id,user_id) 
VALUES (1,1),(2,1),(3,2),(4,2),(5,2);

INSERT INTO transaction(operation, user_id) VALUES
(150, 1),
(440, 1),
(-80, 1),
(500, 2),
(500, 2),
(-277, 2);

INSERT INTO user_has_quest(user_id, quest_id) VALUES
(1,1),
(1,2),
(2,4),
(2,1);


INSERT INTO user_has_shop(user_id, shop_id) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(2,1),
(2,2),
(2,3),
(2,4),
(3,1),
(3,2),
(4,3),
(4,4);

COMMIT;