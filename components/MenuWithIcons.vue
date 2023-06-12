<template>
  <v-btn
    size="x-large"
    variant="flat"
    class="text-none text-subtitle-1"
    :prepend-icon="selectedItem.icon"
    append-icon="mdi-menu-down"
  >
    {{ selectedItem.label }}

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
import { ref } from "vue";
import {
  IMenuWithIconsOptions,
  IMenuItem,
} from "~/interfaces/IMenuWithIconsOptions";

const props = defineProps<IMenuWithIconsOptions>();
const emit = defineEmits(["itemSelected"]);

const selectedFromProps = (() => {
  if (!props.selected) return props.items[0];
  return props.items.filter((item) => item.label === props.selected)[0];
})();

const selectedItem = ref(selectedFromProps)

const handleItemClick = (item: IMenuItem) => {
  selectedItem.value = item;
  emit("itemSelected", item.label);
};
</script>

<style scoped></style>
