<template>
  <v-dialog v-model="modalCtrl.dialog.show" width="auto">
    <component :is="handleSwitch(modalCtrl.dialog.name)"  @close-dialog="closeDialog" />
  </v-dialog>
</template>

<script setup lang="ts">
import { ConcreteComponent } from 'vue';
import { useModals } from '~/composables/useModals'
import { ModalsEnum } from '~/enums/Modals.enums'
const surveyRenameModal = resolveComponent('SurveyRenameModal')
const deleteItemModal = resolveComponent('DeleteConfirmationModal')
const modalCtrl = useModals()
const handleSwitch = (value: string): string | ConcreteComponent<any> => {
  switch (value) {
    case ModalsEnum.SURVEY_RENAME:
      return surveyRenameModal
    case ModalsEnum.ITEM_DELETE:
      return deleteItemModal
  }
  return ''
}

const closeDialog = () => {
  modalCtrl.reset()
}
</script>

<style scoped></style>
