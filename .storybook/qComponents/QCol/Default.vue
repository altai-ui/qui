<template>
  <div>
    <div class="block">
      <span class="demonstration">with props <b>offset</b></span>

      <q-row class="demo-row">
        <q-col
          cols="4"
          offset="5"
          class="demo-col"
        >4</q-col>
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
