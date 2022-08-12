import { defineInterface } from '@directus/extensions-sdk'
import InterfaceComponent from './interface.vue'

export default defineInterface({
  id: 'dadata',
  name: 'DaData',
  description: '',
  icon: 'find_in_page',
  component: InterfaceComponent,
  types: ['string'],
  options: [
    {
      field: 'token',
      name: '$t:Токен',
      meta: {
        interface: 'input',
        options: {
          font: 'monospace',
        },
        width: 'full',
      },
    },
    {
      field: 'rate',
      name: '$t:Задержка запроса',
      type: 'integer',
      schema: {
        default_value: 300,
      },
      meta: {
        width: 'half',
        interface: 'input',
      },
    },
    {
      field: 'placeholder',
      name: '$t:placeholder',
      meta: {
        width: 'half',
        interface: 'system-input-translated-string',
        options: {
          placeholder: '$t:enter_a_placeholder',
        },
      },
    },
    {
      field: 'iconLeft',
      name: '$t:icon_left',
      type: 'string',
      meta: {
        width: 'half',
        interface: 'select-icon',
      },
    },
    {
      field: 'iconRight',
      name: '$t:icon_right',
      type: 'string',
      meta: {
        width: 'half',
        interface: 'select-icon',
      },
    },
  ],
})
