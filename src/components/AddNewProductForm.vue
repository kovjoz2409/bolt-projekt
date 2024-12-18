<script setup>
import { Unit } from '@/models/unit';
import { productFormSchema } from '@/schemas/productFormSchema';
import { useForm } from 'vee-validate';

const { errors, defineField, handleSubmit, resetForm } = useForm({
  validationSchema: productFormSchema,
  initialValues: {
    amount: {
      value: null,
      unit: null,
    },
  },
});

const bootstrapConfig = (state) => ({
  props: {
    invalidFeedback: state.errors[0],
    state: state.errors[0] ? false : state.touched ? true : undefined,
  },
});

const [name, nameProps] = defineField('name', bootstrapConfig);
const [price, priceProps] = defineField('price', bootstrapConfig);
const [stock, stockProps] = defineField('stock', bootstrapConfig);
const [amountValue, amountValueProps] = defineField('amount.value', bootstrapConfig);
const [amountUnit, amountUnitProps] = defineField('amount.unit', bootstrapConfig);

const emit = defineEmits(['add-new-product']);

const onSubmit = handleSubmit((values) => {
  emit('add-new-product', values);
  resetForm();
});
</script>

<template>
  <BForm @submit.prevent="onSubmit" @reset="resetForm">
    <BFormGroup class="mt-2" label="Termék neve:" label-for="product-name" v-bind="nameProps">
      <BFormInput id="product-name" v-model="name" type="text" placeholder="Répa" required />
    </BFormGroup>
    <BFormGroup class="mt-2" label="Ár:" label-for="price" v-bind="priceProps">
      <BFormInput id="price" v-model.number="price" type="text" placeholder="350" required />
    </BFormGroup>
    <BFormGroup class="mt-2" label="Raktárkészlet:" label-for="stock" v-bind="stockProps">
      <BFormInput id="stock" v-model.number="stock" type="text" placeholder="14" required />
    </BFormGroup>
    <BFormGroup class="mt-2" label="Kiszerelés:" label-for="amount-value" v-bind="amountValueProps">
      <BFormInput
        id="amount-value"
        v-model.number="amountValue"
        type="text"
        placeholder="25"
        required
      />
    </BFormGroup>
    <BFormGroup v-bind="amountUnitProps">
      <BFormSelect class="mt-2" id="amount-unit" v-model="amountUnit" required>
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
