import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
import faker from 'faker';
import moment from 'moment';

export default new Vuex.Store({
  strict: process.env.NODE_ENV != 'production',
  state: {
    orderList: [],
    productList: [],
  },
  mutations: {
    ['CREATE_FAKE_ORDER_LIST'](state) {
      let statusSet = ['Paid', 'Unpaid', 'Shipping', 'Done'];

      function createProductList() {
        var list = []
        for (let i = 0; i < Math.ceil(Math.random() * 3); i++) {
          list.push({
            name: faker.commerce.productName(),
            price: Number(faker.commerce.price()),
            amount: Math.ceil(Math.random() * 2)
          });
        }
        return list;
      }

      function calculateTotal(list) {
        return list.map(ele => ele.price * ele.amount)
          .reduce((a, b) => a + b, 0);
      }
      for (let i = 0; i < 5; i++) {
        var list = createProductList();
        state.orderList.push({
          productList: list,
          customer: faker.name.findName(),
          addToCart: moment(faker.date.past()).format('YYYY-MM-DD h:mm'),
          checkOut: moment(faker.date.future()).format('YYYY-MM-DD h:mm'),
          total: calculateTotal(list),
          address: createFakeAddress(),
          status: statusSet[Math.floor(Math.random() * statusSet.length)]
        });
      }
    },
    ['CREATE_FAKE_PRODUCT_LIST'](state) {
      let statusSet = ['Published', 'Unpublished'];
      for (let i = 0; i < 5; i++) {
        var original = faker.commerce.price()
        state.productList.push({
          sizeList: [{
              size: 'L',
              inventory: {
                gray: 15,
                black: 20
              }
            },
            {
              size: 'M',
              inventory: {
                gray: 15,
                black: 20
              }
            },
            {
              size: 'S',
              inventory: {
                gray: 15,
                black: 20
              }
            }
          ],
          name: faker.name.findName(),
          imageUrl: 'https://fakeimg.pl/100x100',
          original,
          discount: Math.round(original * 0.9),
          status: statusSet[Math.floor(Math.random() * statusSet.length)]
        });
      }
    },
    ['UPDATE_ORDER_STATUS'](state, {
      value,
      index
    }) {
      state.orderList[index].status = value;
    },
    ['UPDATE_PRODUCT_STATUS'](state, {
      value,
      index
    }) {
      state.productList[index].status = value;
    },
  },
  actions: {
    changeOrderStatus({
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
    changeProductStaus({
      commit
    }, {
      event,
      index
    }) {
      commit('UPDATE_PRODUCT_STATUS', {
        value: event,
        index
      })
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
    },
    changeGroupPublishStatus({
      state,
      commit
    }, {
      value,
      selectedProducts
    }) {
      selectedProducts.forEach(ele => {
        var index = state.productList.indexOf(ele);
        commit('UPDATE_PRODUCT_STATUS', {
          value,
          index
        });
      })
    }
  },

})


function createFakeAddress() {
  return `${faker.address.city()}, ${faker.address.county()}, ${faker.address.streetName()},${faker.address.streetAddress()}`;
}
