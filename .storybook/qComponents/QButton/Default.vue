<template>
  <div>
    <div class="block">
      <span class="demonstration">without props</span>
      <div>
        <q-button>Default</q-button>
        <q-button disabled>Disabled</q-button>
      </div>
    </div>
    <div class="block">
      <span
        class="demonstration"
      >add prop <b>theme="secondary"</b> for secondary style</span>
      <div>
        <q-button theme="secondary">secondary</q-button>
        <q-button
          theme="secondary"
          disabled
        >Disabled</q-button>
      </div>
    </div>
    <div class="block">
      <span
        class="demonstration"
      >add prop <b>full-width</b> for filling parent container width</span>
      <div>
        <q-button full-width>Default</q-button>
      </div>
    </div>
  </div>
</template>
