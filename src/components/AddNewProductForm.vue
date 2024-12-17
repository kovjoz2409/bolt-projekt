<script setup>
import { Unit } from '@/models/unit';
import { ref } from 'vue';

const emit = defineEmits(['add-new-product']);
const product = ref({ amount: { unit: null } });

function submitForm() {
  emit('add-new-product', product.value);
  resetForm();
}

function resetForm() {
  product.value = { amount: { unit: null } };
}
</script>

<template>
  <BForm @submit.prevent="submitForm" @reset="resetForm">
    <BFormGroup class="mt-2" label="Termék neve:" label-for="product-name">
      <BFormInput
        id="product-name"
        v-model="product.name"
        type="text"
        placeholder="Répa"
        required
      />
    </BFormGroup>
    <BFormGroup class="mt-2" label="Ár:" label-for="price">
      <BFormInput id="price" v-model="product.price" type="text" placeholder="350" required />
    </BFormGroup>
    <BFormGroup class="mt-2" label="Raktárkészlet:" label-for="stock">
      <BFormInput id="stock" v-model="product.stock" type="text" placeholder="14" required />
    </BFormGroup>
    <BFormGroup class="mt-2" label="Kiszerelés:" label-for="amount-value">
      <BFormInput
        id="amount-value"
        v-model="product.amount.value"
        type="text"
        placeholder="25"
        required
      />
      <BFormSelect class="mt-2" id="amount-unit" v-model="product.amount.unit" required>
        <BFormSelectOption :value="null">Kiszerelés kiválasztása</BFormSelectOption>
        <BFormSelectOption v-for="[key, value] in Object.entries(Unit)" :value="value"
          >{{ key }} ({{ value }})</BFormSelectOption
        >
      </BFormSelect>
    </BFormGroup>

    <div class="mt-2">
      <BButton type="submit" variant="primary">Hozzáadás</BButton>
      <BButton class="ms-2" type="reset" variant="danger">Törlés</BButton>
    </div>
  </BForm>
</template>
