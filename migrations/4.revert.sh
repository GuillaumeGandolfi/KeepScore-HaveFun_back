# Je prends l'identité admin_ofact
export PGUSER=admin_kshf
export PGPASSWORD=kshf

# sqitch revert
# sqitch revert 1.create_tables
# sqitch revert 2.add_unique_user
sqitch revert 3.add_table_collection