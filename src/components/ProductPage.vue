<template>
    <div class="mT20 mB30">
        <el-select class="mR10" v-model="selectedStatus" @change="updateSelectedCol" placeholder="choose multiple">
            <el-option v-for="(sta, i) in statusSet" :value="sta" :key="i">{{ sta }}</el-option>
        </el-select>

        <el-tooltip content="Change Status">
            <el-dropdown type="primary" trigger="click" @command="changeGroupPublishStatus">
                <i class="fas fa-tags"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item disabled>change status to ...</el-dropdown-item>
                    <el-dropdown-item v-for="(item, i ) in statusSet" :key="i" :command="item">{{ item }}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-tooltip>

        <el-table ref="productListTable" class="dashboardCard-shadow mT10" :stripe="true" :data="productList">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="Product" prop="name">
                <template slot-scope="scope">
                    <img class="productListItem__img" :src="scope.row.imageUrl" alt="">
                    <p>{{ scope.row.name }}</p>
                </template>
            </el-table-column>
            <el-table-column label="Original" prop="original">
                <template slot-scope="scope"><p>${{ scope.row.original | numFormat }}</p></template>
            </el-table-column>
            <el-table-column label="Discount" prop="discount">
                <template slot-scope="scope"><p>${{ scope.row.discount | numFormat }}</p></template>
            </el-table-column>
            <el-table-column label="Inventory" prop="productList" width="200">
                <template slot-scope="scope">
                    <el-row class="sizeListItem" v-for="(item, i) in scope.row.sizeList" :key="i" :gutter="10">
                        <el-col :span="4"><p>{{ item.size }}</p></el-col>
                        <el-col :span="10">
                            <p v-for="(inv, key, index) in item.inventory" :key="index">{{ key }}</p>
                        </el-col>
                        <el-col :span="10">
                            <p v-for="(inv, key, index) in item.inventory" :key="index">{{ inv }}</p>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column label="Status" prop="status">
                <template slot-scope="scope">
                    <el-select class="statusSelect" :class="statusSelect(scope.row.status)" :value="productList[scope.$index].status" @change="changeProductStatus($event, scope.$index)" placeholder="choose status">
                        <el-option v-for="(sta, i) in statusSet" :label="sta" :value="sta" :key="i">{{ sta }}</el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    data() {
        return {
            statusSet: ['Published', 'Unpublished'],
            selectedStatus: '',
        }
    },
    filters: {
        numFormat(val) {
            return val.toString().replace(/(?=((?!\b)\d{3})+$)/g, ',');
        }
    },
    computed: {
        ...mapState(['productList'])
    },
    methods: {
        statusSelect(status) {
            return `statusSelect-${status}`;
        },
        changeProductStatus(event, index) {
            this.$store.dispatch('changeProductStaus', {
                event, index
            })
        },
        updateSelectedCol(val) {
            var self = this;
            self.$refs.productListTable.clearSelection();
            this.productList.filter(ele => {
                return ele.status == val;
            }).forEach(target => {
                self.$refs.productListTable.toggleRowSelection(target);
            });
        },
        changeGroupPublishStatus(value) {
            var selectedProducts = this.$refs.productListTable.selection;
            this.$store.dispatch('changeGroupPublishStatus', {
                value, selectedProducts
            });
        }
    }
}
</script>