<template>
  <v-btn
    size="x-large"
    variant="flat"
    class="text-none text-subtitle-1"
    :prepend-icon="selectedItem?.icon"
    append-icon="mdi-menu-down"
  >
    {{ selectedItem?.label }}

    <v-menu activator="parent">
      <v-list>
        <v-list-item v-for="item in items" :key="item.label">
          <v-btn
            class="text-none text-subtitle-1"
            variant="flat"
            @click="handleItemClick(item)"
            :prepend-icon="item.icon"
            >{{ item.label }}</v-btn
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  IMenuWithIconsOptions,
  IMenuItem,
} from "../interfaces/IMenuWithIconsOptions";

const props = defineProps<IMenuWithIconsOptions>();
const emit = defineEmits(["itemSelected"]);

const selectedItem = computed(() => {
  if(props.items) {
    return props.items.filter((item) => item.id === props.selectedItemId)[0] ?? props.items[0]
  }
  return null
})
const handleItemClick = (item: IMenuItem) => {
  emit("itemSelected", item.id);
};
</script>

<style scoped></style>
