# Je prends l'identité admin_ocolis
export PGUSER=admin_kshf
export PGPASSWORD=kshf

# sqitch deploy
# sqitch deploy 1.create_tables
# sqitch deploy 2.add_unique_user
sqitch deploy 3.add_table_collection