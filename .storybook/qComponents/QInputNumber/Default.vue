<template>
  <div>
    <div class="block">
      <span class="demonstration">Default Input-number</span>
      <q-input-number v-model="input" />
    </div>

    <div class="block">
      <span
        class="demonstration"
      >Input-number with <b>:min</b> and <b>:max</b> props</span>
      <q-input-number
        v-model="input2"
        :min="-1"
        :max="3"
      />
    </div>

    <div class="block">
      <span
        class="demonstration"
      >Input-number with <b>:precision</b> and <b>:step</b> props</span>
      <q-input-number
        v-model="input3"
        :precision="2"
        :step="0.2"
      />
    </div>

    <div class="block">
      <span
        class="demonstration"
      >Input-number looks like simple input <br />with <b>:controls</b> prop
        sets to false</span>
      <q-input-number
        v-model="input4"
        :controls="false"
      />
    </div>

    <div class="block">
      <span class="demonstration">Disabled Input-number</span>
      <q-input-number
        v-model="input5"
        disabled
      />
    </div>

    <div class="block">
      <span class="demonstration">Input-number with null value</span>
      <q-input-number v-model="input6" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '2',
      input2: 4,
      input3: 0.1,
      input4: 1,
      input5: -1,
      input6: null
    };
  }
};
</script>
