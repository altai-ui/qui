<template>
  <div class="props">
    <h2>Props:</h2>
    <table>
      <tr>
        <th>Props</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>title</td>
        <td>String</td>
        <td>empty string</td>
        <td>—</td>
      </tr>
      <tr>
        <td>tag-name</td>
        <td>String</td>
        <td>span</td>
        <td>—</td>
      </tr>
      <tr>
        <td>trigger</td>
        <td>String</td>
        <td>click</td>
        <td>
          Optional value: <br />
          <ul>
            <li><strong>hover</strong> - hover to open content</li>
            <li><strong>click</strong> - click to open content</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>placement</td>
        <td>String</td>
        <td>top-start</td>
        <td>
          Optional value: <br />
          <ul>
            <li>
              <strong>top</strong>
            </li>
            <li>
              <strong>top-start</strong>
            </li>
            <li>
              <strong>top-end</strong>
            </li>
            <li>
              <strong>right</strong>
            </li>
            <li>
              <strong>right-start</strong>
            </li>
            <li>
              <strong>right-end</strong>
            </li>
            <li>
              <strong>bottom</strong>
            </li>
            <li>
              <strong>bottom-start</strong>
            </li>
            <li>
              <strong>right-end</strong>
            </li>
            <li>
              <strong>left</strong>
            </li>
            <li>
              <strong>left-start</strong>
            </li>
            <li>
              <strong>left-end</strong>
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>icon</td>
        <td>String</td>
        <td>q-icon-question</td>
        <td>—</td>
      </tr>
      <tr>
        <td>icon-color</td>
        <td>String</td>
        <td>var(--gradient-secondary)</td>
        <td>
          <b>Options value</b><br />
          linear-gradient, radial-gradient, hex, rgb, rgba hsl, hsla,
        </td>
      </tr>
      <tr>
        <td>transition</td>
        <td>String</td>
        <td>fade-in-linear</td>
        <td>—</td>
      </tr>
      <tr>
        <td>open-delay</td>
        <td>Number</td>
        <td>10</td>
        <td>delay before appearing when trigger, in milliseconds</td>
      </tr>
      <tr>
        <td>close-delay</td>
        <td>Number</td>
        <td>10</td>
        <td>
          delay before disappearing when trigger, in milliseconds
        </td>
      </tr>
      <tr>
        <td>min-width</td>
        <td>String, Number</td>
        <td>empty string</td>
        <td>
          —
        </td>
      </tr>
      <tr>
        <td>max-width</td>
        <td>String, Number</td>
        <td>empty string</td>
        <td>
          —
        </td>
      </tr>
      <tr>
        <td>popper-options</td>
        <td>Object</td>
        <td>
          empty object
        </td>
        <td>
          <a
            href="https://popper.js.org/docs/v2/"
            target="_blank"
          >popper.js</a>
        </td>
      </tr>
      <tr>
        <td>append-to-body</td>
        <td>Boolean</td>
        <td>
          false
        </td>
        <td>
          -
        </td>
      </tr>
    </table>

    <h2>Slots:</h2>
    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>—</td>
        <td>content of popover</td>
      </tr>
      <tr>
        <td>reference</td>
        <td>HTML element that triggers popover</td>
      </tr>
    </table>

    <h2>Events:</h2>
    <table>
      <tr>
        <th>Event Name</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>show</td>
        <td>triggers when popover shows</td>
      </tr>
      <tr>
        <td>hide</td>
        <td>triggers when popover hides</td>
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
