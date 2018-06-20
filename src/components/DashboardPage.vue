<template>
    <div class="mT20 mB30">
        <div class="row">
            <div class="col-md-4">
                <h1 class="title">Overview</h1>
            </div>
            <div class="col-md-8">
                <div class="float-right">
                    <span class="font-sm color-default">2018-06-01 <i class="fas fa-caret-right"></i> 2018-06-07</span>
                    <el-select v-model="interval" placeholder="選擇區間">
                        <el-option v-for="i in intervalOptions"
                            :key="i.value"
                            :label="i.title"
                            :value="i.value"
                        ></el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="row mT10">
            <div class="col-md-4 mT10">
                <div class="dashboardCard">
                    <p class="cashFlow__title text-center"><i class="mR10 icon-middle fas fa-hand-holding-usd"></i>TOTAL REVENUE</p>
                    <p class="cashFlow__value text-center dashboard__revenue">54540</p>
                </div>
            </div>
            <div class="col-md-4 mT10">
                <div class="dashboardCard">
                    <p class="cashFlow__title text-center"><i class="mR10 icon-middle fas fa-boxes"></i>TOTAL COST</p>
                    <p class="cashFlow__value text-center dashboard__cost">12660</p>
                </div>
            </div>
            <div class="col-md-4 mT10">
                <div class="dashboardCard">
                    <p class="cashFlow__title text-center"><i class="mR10 icon-middle fas fa-money-bill-alt"></i>NET INCOME</p>
                    <p class="cashFlow__value text-center dashboard__income">41880</p>
                </div>
            </div>
        </div>
        <div class="row mT30">
            <div class="col-md-12">
                <div class="dashboardCard">
                    <h3 class="title">Activity</h3>
                    <ve-line :data="chartData" :data-zoom="dataZoom" :colors="colors"></ve-line>
                </div>
            </div>
        </div>
        <div class="row mT30">
            <div class="col-md-6 mT10">
                <div class="dashboardCard">
                    <h3 class="title">Transaction Website</h3>
                    <div class="dashboardCard__body">
                        <div class="transactionItem">
                            <div class="transactionItem__icon"><i class="fa-facebook fab fa-3x"></i></div>
                            <p class="transactionItem__website m0">Facebook.com</p>
                            <p class="transactionItem__value m0">45836</p>
                            <el-tooltip effect="dark" placement="top">
                                <div slot="content" class="text-center"><span class="font-md">INCREASE <span class="color-secondary">899</span> VIEW</span><br/><span class="font-sm">last week 44,937</span></div>
                                <p class="transactionItem__fluctuation color-secondary m0"><i class="fas fa-arrow-up"></i>20%</p>
                            </el-tooltip>
                        </div>
                        <div class="transactionItem">
                            <div class="transactionItem__icon"><i class="fa-google fab fa-3x"></i></div>
                            <p class="transactionItem__website m0">google.com</p>
                            <p class="transactionItem__value m0">23582</p>
                            <el-tooltip effect="dark" content="test" placement="top">
                                <div slot="content" class="text-center"><span class="font-md">INCREASE <span class="color-secondary">899</span> VIEW</span><br/><span class="font-sm">last week 44,937</span></div>
                                <p class="transactionItem__fluctuation color-secondary m0"><i class="fas fa-arrow-up"></i>12%</p>
                            </el-tooltip>
                        </div>
                        <div class="transactionItem">
                            <div class="transactionItem__icon"><i class="fa-wordpress-simple fab fa-3x"></i></div>
                            <p class="transactionItem__website m0">wordpress.com</p>
                            <p class="transactionItem__value m0">2489</p>
                            <el-tooltip effect="dark" content="test" placement="top">
                                <div slot="content" class="text-center"><span class="font-md">DECREASE <span class="color-danger">899</span> VIEW</span><br/><span class="font-sm">last week 44,937</span></div>
                                <p class="transactionItem__fluctuation color-danger m0"><i class="fas fa-arrow-down"></i>15%</p>
                            </el-tooltip>
                        </div>
                        <div class="transactionItem">
                            <div class="transactionItem__icon"><i class="fa-medium fab fa-3x"></i></div>
                            <p class="transactionItem__website m0">medium.com</p>
                            <p class="transactionItem__value m0">1057</p>
                            <el-tooltip effect="dark" content="test" placement="top">
                                <div slot="content" class="text-center"><span class="font-md">DECREASE <span class="color-danger">899</span> VIEW</span><br/><span class="font-sm">last week 44,937</span></div>
                                <p class="transactionItem__fluctuation color-danger m0"><i class="fas fa-arrow-down"></i>30%</p>
                            </el-tooltip>
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-md-6 mT10">
                <div class="dashboardCard">
                    <h3 class="title">Latest Orders</h3>
                    <div class="dasheboardCard__body">
                        <div v-for="i in latestOrders" :key="i.buyerName" class="latestOrderItem">
                            <img class="latestOrderItem__image" :src="i.imageUrl" alt="">
                            <div class="latestOrderItem__mid">
                                <p class="font-md font-weight-bold">{{ i.productTitle }}</p>
                                <p class="font-sm color-default m0"><i class="fa-clock fas fa-fw mR10"></i>{{ i.purchaseDate }}</p>
                                <p class="font-sm color-default m0"><i class="fa-male fas fa-fw mR10"></i>{{ i.buyerName }}</p>
                            </div>
                            <div class="latestOrderItem__right">
                                <div>
                                    <p class="font-xs text-right mB5">TOTAL</p>
                                    <p class="font-md font-weight-bold text-right m0">${{ i.totalPrice }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import faker from 'faker';
export default {
    data() {
        return {
            colors: ['#7dd67d', '#4266f7', '#ff6d85'],
            interval: '',
            intervalOptions: [{
                title: 'week',
                value: 'week'
            }, {
                title: 'month',
                value: 'month'
            }],
            chartData: {
                columns: ['date', 'revenue', 'cost', 'net income'],
                rows: [
                    {'date': '6/1', 'revenue': 2393, 'cost': 1093, 'net income': 1300},
                    {'date': '6/2', 'revenue': 5530, 'cost': 3230, 'net income': 2300},
                    {'date': '6/3', 'revenue': 7623, 'cost': 5043, 'net income': 2580},
                    {'date': '6/4', 'revenue': 1753, 'cost': 1423, 'net income': 330},
                    {'date': '6/5', 'revenue': 3792, 'cost': 1080, 'net income': 2712},
                    {'date': '6/6', 'revenue': 6023, 'cost': 4293, 'net income': 1730}
                ]
            },
            dataZoom: {
                type: 'slider'
            },

            // latest order
            latestOrders: []
        }
    },
    created() {
        for(let i = 0; i < 3; i++) {
            this.latestOrders.push({
                productTitle: faker.commerce.productName(),
                purchaseDate: faker.date.recent(),
                totalPrice: faker.commerce.price(),
                buyerName: faker.name.findName(),
                imageUrl: faker.image.avatar()
            });
        }
    }
}
</script>

