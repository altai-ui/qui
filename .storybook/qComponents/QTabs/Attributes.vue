<template>
  <div class="props">
    <h2>Props QTabs:</h2>
    <table>
      <tr>
        <th>Props</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>value/v-model</td>
        <td>String</td>
        <td>Empty string</td>
        <td>-</td>
      </tr>
      <tr>
        <td>tabWidth</td>
        <td>[String, Number]</td>
        <td>200px</td>
        <td>-</td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>Boolean</td>
        <td>false</td>
        <td>disabled all tabs</td>
      </tr>
    </table>

    <h2>Props QTabPane:</h2>
    <table>
      <tr>
        <th>Props</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>name</td>
        <td>String</td>
        <td>-</td>
        <td>is required</td>
      </tr>
      <tr>
        <td>title</td>
        <td>String</td>
        <td>Empty string</td>
        <td>-</td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>Boolean</td>
        <td>false</td>
        <td>-</td>
      </tr>
      <tr>
        <td>description</td>
        <td>String</td>
        <td>Empty string</td>
        <td>-</td>
      </tr>
    </table>

    <h2>Slots:</h2>
    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>content</td>
        <td>contents to the right of the tab</td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.props {
  padding: 16px 24px;
  font-size: 16px;
  line-height: 1.5;
}

h2 {
  margin-top: 0;
}

table {
  display: block;
  width: 100%;
  margin-bottom: 32px;
  overflow: auto;
  border-collapse: collapse;

  tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
  }

  th {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }
}
</style>
