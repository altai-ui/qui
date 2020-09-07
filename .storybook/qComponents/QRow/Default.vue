<template>
  <div>
    <div class="block">
      <span class="demonstration">default</span>

      <q-row class="demo-row">
        <q-col
          cols="2"
          class="demo-col"
        >2</q-col>
        <q-col
          cols="4"
          class="demo-col"
        >4</q-col>
        <q-col
          cols="6"
          class="demo-col"
        >6</q-col>
      </q-row>
    </div>

    <div class="block">
      <span
        class="demonstration"
      >with props <b>align-v</b> and <b>align-h</b></span>

      <q-row
        class="demo-row"
        align-v="center"
        align-h="center"
        style="height: 100px"
      >
        <q-col
          cols="4"
          class="demo-col"
        >center</q-col>
      </q-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-row {
  width: 500px;
  background-color: var(--color-tertiary-gray);
}

.demo-col {
  background-color: var(--color-tertiary-gray-ultra-darker);
  border-radius: var(--border-radius-base);

  &:nth-child(odd) {
    background-color: var(--color-tertiary-gray-ultra-dark);
  }
}
</style>
