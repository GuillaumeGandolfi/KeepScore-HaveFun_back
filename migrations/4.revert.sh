# Je prends l'identité admin_kshf
export PGUSER=admin_kshf
export PGPASSWORD=KSHF

# sqitch revert
# sqitch revert 1.create_tables
# sqitch revert 2.add_unique_user
# sqitch revert 3.add_table_collection
# sqitch revert 4.modify_transaction
# sqitch revert 5.modify_collection
sqitch revert 6.modify_shop
# sqitch revert 7.modify_tables