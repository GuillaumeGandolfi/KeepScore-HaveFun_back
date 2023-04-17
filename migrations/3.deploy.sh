# Je prends l'identité admin_ocolis
export PGUSER=admin_kshf
export PGPASSWORD=KSHF

# sqitch deploy
sqitch deploy 1.create_tables_v2
sqitch deploy 2.add_constraint_delete
