<script lang="ts" setup>
import { reactive, ref } from 'vue';
import CoinCheck from './coin-check.vue';
const props = defineProps<{
  pair?: string;
  background?: string;
}>();
const url = 'https://api.coinbase.com/v2/prices';
const btcPair = 'BTC-USD';
const ethPair = 'ETH-USD';

interface moneyFormat {
  formatted: string;
  money: number;
  name: string;
}
const btc = reactive<moneyFormat>({} as moneyFormat);
const eth = reactive<moneyFormat>({} as moneyFormat);
const pairData = reactive<moneyFormat>({} as moneyFormat);
const date = ref('');

const grabPrices = async (pair: string): Promise<moneyFormat> => {
  const coinInfo = await fetch(`${url}/${pair}/spot`);
  const money = await coinInfo.json();
  return {
    money: parseFloat(money.data.amount),
    formatted: new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(money.data.amount),
    name: pair.split('-')[0]
  };
};

const setValues = async () => {
  const btcValue = await grabPrices(btcPair);
  btc.formatted = btcValue.formatted;
  btc.money = btcValue.money;
  btc.name = btcValue.name;

  const ethValue = await grabPrices(ethPair);
  eth.formatted = ethValue.formatted;
  eth.money = ethValue.money;
  eth.name = ethValue.name;
  date.value = new Date().toString();

  if (props.pair) {
    const pairValue = await grabPrices(props.pair);
    pairData.formatted = pairValue.formatted;
    pairData.money = pairValue.money;
    pairData.name = pairValue.name;
  }
};
setValues();
setInterval(setValues, 5000);
</script>
<template>
  <slot name="header"></slot>
  <section>
    <coin-check :coin="btc" :style="'background-color:' + background"></coin-check>
    <coin-check :coin="eth" :style="'background-color:' + background"></coin-check>
    <coin-check v-if="pair" :coin="pairData" :style="'background-color:' + background"></coin-check>
  </section>
  <div class="sub">
    Last Update :
    <span>{{ date }}</span>
  </div>
  <slot name="footer"></slot>
</template>
<style>
.sub {
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 0.625rem;
}
section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 2.5rem;
  margin: 0 auto;
  gap: 1rem;
}

.inner {
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  box-shadow: 0 3px 10px rgb(0 0 0 /0.2);
}
.price-info {
  display: flex;
  gap: 1.2rem;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
svg {
  width: 30px;
}
.up {
  fill: green;
}
.down {
  fill: red;
}
</style>
