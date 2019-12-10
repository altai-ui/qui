import { storiesOf, addDecorator } from '@storybook/vue'
import Centered from '@storybook/addon-centered/vue'

addDecorator(Centered)

const requireComponent = require.context('../components', true, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  const extractedPath = fileName.match(/\/(.+)\/([\w-]+?(?=\.))/)
  storiesOf(`Components|${extractedPath[1]}`, module).add(
    extractedPath[2],
    () => requireComponent(fileName).default
  )
})
