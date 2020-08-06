<template>
  <div
    class="demo-wrapper"
    style="margin: 100px 0;"
  >
    <div class="demo-wrapper__block">
      <h2 class="demo-wrapper__title">Default QTabs</h2>
      <el-collapse>
        <el-collapse-item title="Code">
          <pre class="demo-wrapper__code">{{ codeFirst }} </pre>
        </el-collapse-item>
      </el-collapse>
      <h3 class="demo-wrapper__sub-title">Result:</h3>
      <div class="demo-wrapper__result">
        <q-tabs v-model="activeTab1">
          <q-tab-pane
            name="first_tab"
            title="First tab"
          />
          <q-tab-pane
            name="second_tab"
            title="Second tab"
          />
          <q-tab-pane
            name="third_tab"
            title="Third tab"
          />
        </q-tabs>
      </div>
    </div>

    <div class="demo-wrapper__block">
      <p>
        Add prop <b>disabled</b> to <b>q-tabs-tab</b> for disabled selected tab
      </p>
      <el-collapse>
        <el-collapse-item title="Code">
          <pre class="demo-wrapper__code">{{ codeSecond }} </pre>
        </el-collapse-item>
      </el-collapse>
      <h3 class="demo-wrapper__sub-title">Result:</h3>
      <div class="demo-wrapper__result">
        <q-tabs v-model="activeTab2">
          <q-tab-pane
            name="first_tab"
            title="First tab"
          />
          <q-tab-pane
            name="second_tab"
            title="Second tab"
          />
          <q-tab-pane
            name="third_tab"
            title="Third tab"
            disabled
          />
        </q-tabs>
      </div>
    </div>

    <div class="demo-wrapper__block">
      <p>Add prop <b>disabled</b> to <b>q-tabs</b> for disabled all tabs</p>
      <el-collapse>
        <el-collapse-item title="Code">
          <pre class="demo-wrapper__code">{{ codeThird }} </pre>
        </el-collapse-item>
      </el-collapse>
      <h3 class="demo-wrapper__sub-title">Result:</h3>
      <div class="demo-wrapper__result">
        <q-tabs
          v-model="activeTab3"
          disabled
        >
          <q-tab-pane
            name="first_tab"
            title="First tab"
          />
          <q-tab-pane
            name="second_tab"
            title="Second tab"
          />
          <q-tab-pane
            name="third_tab"
            title="Third tab"
          />
        </q-tabs>
      </div>
    </div>

    <div class="demo-wrapper__block">
      <p>Add prop <b>description</b></p>
      <el-collapse>
        <el-collapse-item title="Code">
          <pre class="demo-wrapper__code">{{ codeFourth }} </pre>
        </el-collapse-item>
      </el-collapse>
      <h3 class="demo-wrapper__sub-title">Result:</h3>
      <div class="demo-wrapper__result">
        <q-tabs v-model="activeTab4">
          <q-tab-pane
            name="first_tab"
            title="First tab"
            description="Все MAC’и, которые зафиксировал MT_BOX"
          />
          <q-tab-pane
            name="second_tab"
            title="Second tab"
            description="Количество уникальных ассоциаций менее 2-х минут"
          />
          <q-tab-pane
            name="third_tab"
            title="Third tab"
            description="Количество ассоциаций с MT_Box более 2-х минут"
          />
        </q-tabs>
      </div>
    </div>

    <div class="demo-wrapper__block">
      <p>Add slot <b>content</b></p>
      <el-collapse>
        <el-collapse-item title="Code">
          <pre class="demo-wrapper__code">{{ codeFifth }} </pre>
        </el-collapse-item>
      </el-collapse>
      <h3 class="demo-wrapper__sub-title">Result:</h3>
      <div class="demo-wrapper__result">
        <q-tabs
          v-model="activeTab5"
          tab-width="190px"
        >
          <q-tab-pane
            name="first_tab"
            title="First tab"
          >
            <el-popover
              slot="content"
              title="Title"
              placement="top-start"
            >
              <q-button
                slot="reference"
                circle
                size="small"
                theme="secondary"
                icon="q-icon-question-mark"
                type="icon"
                style="margin-right: 12px; margin-left: 8px;"
              />
            </el-popover>
          </q-tab-pane>
          <q-tab-pane
            name="second_tab"
            title="Second tab"
          />
          <q-tab-pane
            name="third_tab"
            title="Third tab"
          />
        </q-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab1: 'first_tab',
      activeTab2: 'first_tab',
      activeTab3: 'first_tab',
      activeTab4: 'first_tab',
      activeTab5: 'first_tab',
      codeFirst: `<q-tabs v-model="activeTab1">
    <q-tab-pane name="first_tab" title="First tab" />
    <q-tab-pane name="second_tab" title="Second tab" />
    <q-tab-pane name="third_tab" title="Third tab" />
</q-tabs> `,
      codeSecond: `<q-tabs v-model="activeTab2">
    <q-tab-pane name="first_tab" title="First tab" />
    <q-tab-pane name="second_tab" title="Second tab" />
    <q-tab-pane name="third_tab" title="Third tab" disabled />
</q-tabs>`,
      codeThird: `<q-tabs v-model="activeTab3" disabled>
    <q-tab-pane name="first_tab" title="First tab" />
    <q-tab-pane name="second_tab" title="Second tab" />
    <q-tab-pane name="third_tab" title="Third tab" />
</q-tabs>`,
      codeFourth: `<q-tabs v-model="activeTab4">
    <q-tab-pane
        name="first_tab"
        title="First tab"
        description="Все MAC’и, которые зафиксировал MT_BOX"
    />
    <q-tab-pane
        name="second_tab"
        title="Second tab"
        description="Количество уникальных ассоциаций менее 2-х минут"
    />
    <q-tab-pane
        name="third_tab"
        title="Third tab"
        description="Количество ассоциаций с MT_Box более 2-х минут"
    />
</q-tabs>`,
      codeFifth: `<q-tabs v-model="activeTab5" tab-width="190px">
    <q-tab-pane name="first_tab" title="First tab">
        <el-popover slot="content" title="Title" placement="top-start">
            <q-button
                slot="reference"
                circle
                size="small"
                theme="secondary"
                icon="q-icon-question-mark"
                type="icon"
                style="margin-right: 12px; margin-left: 8px;"
            />
        </el-popover>
    </q-tab-pane>
    <q-tab-pane name="second_tab" title="Second tab" />
    <q-tab-pane name="third_tab" title="Third tab" />
</q-tabs>`
    };
  }
};
</script>
