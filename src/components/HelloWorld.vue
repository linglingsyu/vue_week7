<template>
  <form>
    <div class="form-check">
      <label class="form-check-label">
        <input
          class="form-check-input"
          type="checkbox"
          :true-value="true"
          :false-value="false"
          v-model="noLimit"
          @change="checkboxValue = []"
        />
        不限
      </label>
    </div>
    <div class="form-check" v-for="item in formTemplate" :key="item.label">
      <label class="form-check-label">
        <input
          class="form-check-input"
          type="checkbox"
          :value="item.value"
          v-model="checkboxValue"
          @change="updateValue"
        />
        {{ item.label }}
      </label>
    </div>
    <div class="row">
      <div class="col">
        <input type="text" class="form-control" v-model="minValue" />
      </div>
      <div class="w-auto">~</div>
      <div class="col">
        <input type="text" class="form-control" v-model="maxValue" />
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const noLimit = ref(false)
const checkboxValue = ref([])
const minValue = ref(null)
const maxValue = ref(null)

const formTemplate = [
  {
    label: '20以下',
    value: 1,
    min: null,
    max: 20
  },
  {
    label: '20-30',
    value: 2,
    min: 20,
    max: 30
  },
  {
    label: '30-40',
    value: 3,
    min: 30,
    max: 40
  },
  {
    label: '40以上',
    value: 4,
    min: 40,
    max: null
  }
]

const min = computed(
  () =>
    formTemplate.find(
      (item) => item.value === Math.min(...checkboxValue.value)
    ) || null
)
const max = computed(
  () =>
    formTemplate.find(
      (item) => item.value === Math.max(...checkboxValue.value)
    ) || null
)

const updateValue = (event) => {
  const isChecked = event.target.checked // 點選的Element是否被選取
  const checkValue = event.target.value // 點選的Element的值
  noLimit.value = false
  if (isChecked) {
    // 被選取的狀態 補上其他範圍的值
    const arr = []
    for (let i = min.value.value; i <= max.value.value; i++) {
      arr.push(i)
    }
    checkboxValue.value = arr
  } else {
    // 取消選取的狀態
    if (
      event.target.value < min.value.value ||
      event.target.value > max.value.value
    ) {
      // 取消的為最大值或最小值 => 不做任何事
    } else {
      //  取消的為中間值，等同於此選取的值
      checkboxValue.value = [checkValue]
    }
  }
}

// 當最大值或最小值改變時，更新minValue和maxValue
watch([max, min], ([maxVal, minVal]) => {
  minValue.value = minVal.min
  maxValue.value = maxVal.max
})
</script>

<style scoped>
form {
  width: 300px;
}
</style>
