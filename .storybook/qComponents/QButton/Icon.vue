<template>
  <div>
    <div class="block">
      <span class="demonstration">add prop <b>type="icon"</b></span>
      <q-button
        icon="q-icon-pic"
        type="icon"
      />
      <q-button
        theme="secondary"
        type="icon"
      >
        <i class="q-icon-cloud-upload" />
      </q-button>
    </div>
    <div class="block">
      <span class="demonstration">add prop <b>circle</b></span>
      <q-button
        circle
        icon="q-icon-question-mark"
        type="icon"
      />
      <q-button
        circle
        theme="secondary"
        icon="q-icon-question-mark"
        type="icon"
      />
      <q-button
        circle
        disabled
        theme="secondary"
        icon="q-icon-question-mark"
        type="icon"
      />
    </div>
    <div class="block">
      <span
        class="demonstration"
      >add prop <b>size="small"</b> to reduce size to 24x24</span>
      <div>
        <q-button
          icon="q-icon-pic"
          type="icon"
          size="small"
        />
        <q-button
          theme="secondary"
          type="icon"
          size="small"
          icon="q-icon-cloud-upload"
        />
        <q-button
          circle
          icon="q-icon-question-mark"
          type="icon"
          size="small"
        />
        <q-button
          circle
          size="small"
          theme="secondary"
          icon="q-icon-question-mark"
          type="icon"
        />
        <q-button
          circle
          disabled
          size="small"
          theme="secondary"
          icon="q-icon-question-mark"
          type="icon"
        />
      </div>
    </div>
  </div>
</template>
