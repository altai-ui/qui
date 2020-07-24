<template>
  <div class="block">
    <div class="demonstration">
      Minimum / Maximum items checked <br />
      The <b>min</b> and <b>max</b> properties can help you to limit the number
      of checked items.
    </div>
    <q-checkbox-group
      v-model="checkedCities"
      :min="1"
      :max="2"
    >
      <q-checkbox
        v-for="city in cities"
        :key="city"
        :label="city"
      >{{
        city
      }}</q-checkbox>
    </q-checkbox-group>
  </div>
</template>
<script>
const cityOptions = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];
export default {
  data() {
    return {
      checkedCities: ['Shanghai', 'Beijing'],
      cities: cityOptions
    };
  }
};
</script>
