import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
import faker from 'faker';
import moment from 'moment';

export default new Vuex.Store({
  strict: process.env.NODE_ENV != 'production',
  state: {
    orderList: []
  },
  mutations: {
    ['CREATE_FAKE_ORDER_LIST'](state) {
      let statusSet = ['Paid', 'Unpaid', 'Shipping', 'Done'];
      for (let i = 0; i < 5; i++) {
        state.orderList.push({
          productList: [{
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            amount: 1
          }],
          customer: faker.name.findName(),
          addToCart: moment(faker.date.past()).format('YYYY-MM-DD h:mm'),
          checkOut: moment(faker.date.future()).format('YYYY-MM-DD h:mm'),
          total: faker.commerce.price(),
          address: createFakeAddress(),
          status: statusSet[Math.floor(Math.random() * statusSet.length)]
        });
      }
    },
    ['UPDATE_ORDER_STATUS'](state, {
      value,
      index
    }) {
      state.orderList[index].status = value;
    }
  },
  actions: {
    changeStatus({
      commit
    }, {
      event,
      index
    }) {
      commit('UPDATE_ORDER_STATUS', {
        value: event,
        index
      });
    },
    changeGroupStatus({
      state,
      commit
    }, {
      value,
      selectedOrders
    }) {
      selectedOrders.forEach(ele => {
        var index = state.orderList.indexOf(ele);
        commit('UPDATE_ORDER_STATUS', {
          value,
          index
        })
      });
    }
  },

})


function createFakeAddress() {
  return `${faker.address.city()}, ${faker.address.county()}, ${faker.address.streetName()},${faker.address.streetAddress()}`;
}
