<template>
  <div class="demo-wrapper">
    <div class="demo-wrapper__block">
      <h2 class="demo-wrapper__title">Default</h2>
      <p>
        Add <b>slot="reference"</b> for opening popover, slot
        <b>reference</b> is required
      </p>
      <el-collapse>
        <el-collapse-item title="Code">
          <pre class="demo-wrapper__code">{{ codeFirst }} </pre>
        </el-collapse-item>
      </el-collapse>
      <h3 class="demo-wrapper__sub-title">Result:</h3>
      <div class="demo-wrapper__result">
        <q-popover>
          <q-button
            slot="reference"
            circle
            type="icon"
            theme="secondary"
            size="small"
            icon="q-icon-question-mark"
          />
        </q-popover>
      </div>
    </div>

    <div class="demo-wrapper__block">
      <p>Add slot reference <b>q-button</b></p>
      <p>Add prop <b>title="Title"</b></p>
      <p>Add prop <b>icon="q-icon-question"</b></p>
      <el-collapse>
        <el-collapse-item title="Code">
          <pre class="demo-wrapper__code">{{ codeSecond }} </pre>
        </el-collapse-item>
      </el-collapse>
      <h3 class="demo-wrapper__sub-title">Result:</h3>
      <div class="demo-wrapper__result">
        <q-popover
          title="Title"
          icon="q-icon-question"
        >
          <q-button slot="reference">Click me</q-button>
        </q-popover>
      </div>
    </div>

    <div class="demo-wrapper__block">
      <p>Add html content to default slot</p>
      <el-collapse>
        <el-collapse-item title="Code">
          <pre class="demo-wrapper__code">{{ codeFifth }} </pre>
        </el-collapse-item>
      </el-collapse>
      <h3 class="demo-wrapper__sub-title">Result:</h3>
      <div class="demo-wrapper__result">
        <q-popover
          title="Popover"
          icon="q-icon-question"
        >
          <q-button
            slot="reference"
            title="click me"
            circle
            type="icon"
            theme="secondary"
            size="small"
            icon="q-icon-question-mark"
          />
          <div>
            <div>Размер списка: от 1 000 до 50 000 000 уникальных записей;</div>
            <div>Формат записей: файл в формате txt или csv;</div>
            <div>Разделитель записей: запятая, перенос строки, табуляция;</div>
          </div>
        </q-popover>
      </div>
    </div>

    <div class="demo-wrapper__block">
      <p>Default trigger <b>click</b></p>
      <p>Add prop <b>trigger="hover"</b></p>
      <el-collapse>
        <el-collapse-item title="Code">
          <pre class="demo-wrapper__code">{{ codeThird }} </pre>
        </el-collapse-item>
      </el-collapse>
      <h3 class="demo-wrapper__sub-title">Result:</h3>
      <div class="demo-wrapper__result">
        <q-popover
          title="Title"
          icon="q-icon-question"
          trigger="hover"
        >
          <q-button
            slot="reference"
            title="Click me"
            circle
            type="icon"
            theme="secondary"
            size="small"
            icon="q-icon-question-mark"
          />
        </q-popover>
      </div>
    </div>

    <div class="demo-wrapper__block">
      <p>Default placement "top-start"</p>
      <p>Add prop <b>placement="right-start"</b></p>
      <p>
        Other placement values in the
        <a
          href="/?path=/story/q-components-qpopover--attributes"
          target="_blank"
        >documentation</a>
      </p>
      <el-collapse>
        <el-collapse-item title="Code">
          <pre class="demo-wrapper__code">{{ codeFourth }} </pre>
        </el-collapse-item>
      </el-collapse>
      <h3 class="demo-wrapper__sub-title">Result:</h3>
      <div class="demo-wrapper__result">
        <q-popover
          title="Title"
          icon="q-icon-question"
          placement="right-start"
        >
          <q-button
            slot="reference"
            title="Click me"
            circle
            type="icon"
            theme="secondary"
            size="small"
            icon="q-icon-question-mark"
          />
        </q-popover>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      codeFirst: `<q-popover>
  <q-button
    slot="reference"
    circle
    type="icon"
    theme="secondary"
    size="small"
    icon="q-icon-question-mark"
  />
</q-popover> `,
      codeSecond: `<q-popover title="Title" icon="q-icon-question">
    <q-button slot="reference">Click me</q-button>
</q-popover>`,
      codeThird: `<q-popover title="Title" icon="q-icon-question" trigger="hover">
  <q-button
    slot="reference"
    title="Click me"
    circle
    type="icon"
    theme="secondary"
    size="small"
    icon="q-icon-question-mark"
  />
</q-popover>`,
      codeFourth: `<q-popover title="Title" icon="q-icon-question" placement="right-start">
  <q-button
    slot="reference"
    title="Click me"
    circle
    type="icon"
    theme="secondary"
    size="small"
    icon="q-icon-question-mark"
  />
</q-popover>`,
      codeFifth: `<q-popover title="Title" icon="q-icon-question">
  <div>
    <div>Размер списка: от 1 000 до 50 000 000 уникальных записей;</div>
    <div>Формат записей: файл в формате txt или csv;</div>
    <div>Разделитель записей: запятая, перенос строки, табуляция;</div>
  </div>
</q-popover>`
    };
  }
};
</script>
