# sqitch add 1.create_tables -n "création des tables"
# sqitch add 2.add_unique_user -n "Ajout contrainte unique sur le mail des utilisateurs"
# sqitch add 3.add_table_collection -n "Ajout d'une table d'association user_has_collection"
sqitch add 4.modify_transaction -n "Remplacement de input et output par 'operation' + suppression 'accepted' de la table 'user_quest'"