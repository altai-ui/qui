<template>
  <div>
    <div class="block">
      <span class="demonstration">default</span>
      <q-textarea
        v-model="textarea1"
        placeholder="Плейсхолдер"
        :rows="3"
      />
    </div>
    <div class="block">
      <span class="demonstration">add prop <b>autosize</b></span>
      <q-textarea
        v-model="textarea3"
        placeholder="Со значением"
        autosize
      />
    </div>
    <div class="block">
      <span class="demonstration">add prop <b>disabled</b></span>
      <q-textarea
        v-model="textarea1"
        placeholder="Плейсхолдер (неактивный)"
        disabled
      />
    </div>
    <div class="block">
      <span
        class="demonstration"
      >add prop <b>disabled</b> with
        <b>:autosize="{ minRows: 2, maxRows: 6 }</b></span>
      <q-textarea
        v-model="textarea2"
        placeholder="Со значением (неактивный)"
        disabled
        :autosize="{ minRows: 2, maxRows: 6 }"
      />
    </div>
    <div class="block">
      <span
        class="demonstration"
      >add prop <b>show-symbol-limit</b> and set limit
        <b>maxlength="10"</b></span>
      <q-textarea
        v-model="textarea1"
        maxlength="10"
        show-symbol-limit
      />
    </div>
    <div class="block">
      <span
        class="demonstration"
      >add prop <b>show-symbol-limit</b> and set non-strict limit,
        <b>counter-limit="10"</b></span>
      <q-textarea
        v-model="textarea1"
        :counter-limit="10"
        show-symbol-limit
      />
    </div>
    <div class="block">
      <span
        class="demonstration"
      ><b>show-symbol-limit</b> with configured <b>autosize</b></span>
      <q-textarea
        v-model="textarea2"
        placeholder="Со счетчиком"
        :autosize="{ minRows: 2, maxRows: 6 }"
        maxlength="30"
        show-symbol-limit
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea1: '',
      textarea2: 'Значение',
      textarea3:
        'Очень длинное значение. Которое должно увеличивать количество строк'
    };
  }
};
</script>
