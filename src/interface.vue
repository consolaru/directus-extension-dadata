<template>
  <v-menu attached :disabled="disabled">
    <template #activator="{ activate }">
      <v-input
        :placeholder="placeholder"
        :disabled="disabled"
        :model-value="value"
        :dir="direction"
        @update:model-value="onInput"
        @focus="activate"
      >
        <template v-if="iconLeft" #prepend>
          <v-icon :name="iconLeft" />
        </template>
        <template v-if="iconRight" #append>
          <v-icon :name="iconRight" />
        </template>
      </v-input>
    </template>
    <v-list v-if="suggestions.length > 0">
      <v-list-item v-for="item of suggestions" :key="item.data.inn" @click="() => choose(item)">
        <v-list-item-content>ИНН: {{ item.data.inn }}, {{ item.value }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

const emit = defineEmits(['input', 'set-field-value'])

const props = defineProps({
  token: { type: String, default: '' },
  rate: { type: [Number, String], default: 300 },
  value: { type: String, default: '' },
  placeholder: { type: String, default: null },
  iconLeft: { type: String, default: null },
  iconRight: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  direction: { type: String, default: undefined },
})

const suggestions = ref([])

const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'
const options = {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Token ' + props.token,
  },
}

async function fetchSuggestionsRaw (input: string) {
  if (input.length < 3) {
    suggestions.value = []
    return
  }
  try {
    const res = await fetch(url, Object.assign(options, { body: JSON.stringify({ query: input }) }))
    const data = await res.json()
    suggestions.value = data?.suggestions ?? []
  } catch (error) {
    console.error(error)
  }
}

const fetchSuggestions = debounce(fetchSuggestionsRaw, Number(props.rate))

function onInput (input: string | null) {
  input = input?.trim() || ''
  emit('input', input)
  fetchSuggestions(input)
}

// @todo move fields and path to props
async function choose (item: DaDataItem) {
  const data = item.data

  const fields = ['inn', 'kpp', 'ogrn', 'okpo']
  for (const name of fields) {
    emit('set-field-value', { field: name, value: data[name] })
    await nextTick()
  }

  emit('set-field-value', { field: 'name', value: data.name.full })
  await nextTick()

  emit('set-field-value', { field: 'opf', value: data.opf.full })
  await nextTick()

  emit('set-field-value', { field: 'address', value: data.address.unrestricted_value })
  await nextTick()
}

function debounce (func, wait) {
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}
</script>
