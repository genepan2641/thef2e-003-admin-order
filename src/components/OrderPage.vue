<template>
    <div class="mT20 mB30">
        <el-select class="mR10" v-model="selectedStatus" @change="updateSelecedCol($event)" placeholder="choose multiple">
            <el-option v-for="(sta, i) in statusSet" :value="sta" :key="i">{{ sta }}</el-option>
        </el-select>

        <el-tooltip content="Change Status">
            <el-dropdown type="primary" trigger="click" @command="changeGroupStatus">
                <i class="fas fa-tags"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item disabled>change status to ...</el-dropdown-item>
                    <el-dropdown-item v-for="(item, i) in statusSet" :key="i" :command="item">{{ item }}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-tooltip>

        <el-select class="float-right " v-model="orderTableCols" multiple collapse-tags>
            <el-option v-for="(col, i) in orderTableColsSet" :value="col" :key="i">{{ col }}</el-option>
        </el-select>
        <el-table ref="orderListTable" class="dashboardCard-shadow mT10" :stripe="true" :data="orderList">
            <el-table-column type="selection"></el-table-column>
            <el-table-column v-if="orderTableCols.includes('customer')" label="Customer" prop="customer"></el-table-column>
            <el-table-column v-if="orderTableCols.includes('productList')" label="Product List" prop="productList">
                <template slot-scope="scope">
                    <div class="orderProductList" v-for="(item, i) in scope.row.productList" :key="i">
                        <p class="m0">{{ item.name }}</p>
                        <p class="m0"><span class="color-default">${{ item.price | numFormat }}</span><span class="float-right">{{ item.amount }}</span></p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column v-if="orderTableCols.includes('total')"  label="Total" prop="total">
                <template slot-scope="scope">
                    <p class="font-weight-bold">${{ scope.row.total | numFormat  }}</p>
                </template>
            </el-table-column>
            <el-table-column v-if="orderTableCols.includes('addToCart')" label="Add to Cart" prop="addToCart"></el-table-column>
            <el-table-column v-if="orderTableCols.includes('checkOut')" label="Check-out" prop="checkOut"></el-table-column>
            <el-table-column v-if="orderTableCols.includes('address')" label="Address" prop="address"></el-table-column>
            <el-table-column v-if="orderTableCols.includes('status')" label="Status">
                <template slot-scope="scope">
                    <el-select class="statusSelect" :class="statusSelect(scope.row.status)" :value="orderList[scope.$index].status" @change="changeOrderStatus($event, scope.$index)" placeholder="choose status">
                        <el-option v-for="(s,i) in statusSet" :key="i" :label="s" :value="s">{{ s }}</el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
        <div class="mT20">
            <el-pagination class="float-right" layout="prev, pager, next" :page-count="10" background></el-pagination>
        </div>
    </div>
</template>

<script>
import faker from 'faker';
import {mapState} from 'vuex';
export default {
    data() {
        return {
            statusSet: ['Paid', 'Unpaid', 'Shipping', 'Done'],
            orderTableColsSet: ['customer', 'productList', 'total', 'addToCart', 'checkOut', 'address', 'status'],
            orderTableCols: ['customer', 'productList', 'total', 'addToCart', 'checkOut', 'address', 'status'],
            selectedStatus: '',
        }
    },
    filters: {
        numFormat(val) {
            return val.toString().replace(/(?=((?!\b)\d{3})+$)/g, ',');
        }
    },
    computed: {
        ...mapState(['orderList']),

    },
    created() {

    },
    methods: {
        statusSelect(status) {
            return `statusSelect-${status}`;
        },
        changeOrderStatus(event, index) {
            this.$store.dispatch('changeOrderStatus', {
                event, index
            });
        },
        updateSelecedCol(val) {
            var self = this;
            self.$refs.orderListTable.clearSelection();
            this.orderList.filter(ele => {
                return ele.status == val;
            }).forEach(target => {
                self.$refs.orderListTable.toggleRowSelection(target);
            });
        },
        changeGroupStatus(value) {
            var selectedOrders = this.$refs.orderListTable.selection;
            this.$store.dispatch('changeGroupStatus', {value, selectedOrders});
        }
    }
}
</script>
