<template>
  <v-col class="v-col-md-3 v-col-sm-5 v-col-auto mb-6">
    <v-card class="border-decoration" height="400">
      <v-card-title> {{ title }} </v-card-title>

      <v-card-subtitle> {{ `Author: ${author}` }} </v-card-subtitle>

      <v-btn color="" variant="text"> Description </v-btn>

      <v-spacer></v-spacer>

      <v-divider></v-divider>

      <v-card-text height="250">
        {{ description }}
      </v-card-text>
      <v-container
        class="d-flex justify-end position-absolute"
        style="bottom: 0"
      >
        <v-menu v-if="itemsList.length != 0">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>

          <v-list>
            <v-list-item v-for="item in itemsList" :key="item.label">
              <v-btn
                class="text-none text-subtitle-1"
                v-if="item.action"
                @click="item.action"
                variant="flat"
                >{{ item.label }}</v-btn
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-card>
  </v-col>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { ISurveyCardProps } from "~/interfaces/ISurveyCardProps";
import { ISurveyCardMenu } from "~/interfaces/ISurveyCardMenu";
import { useModals } from "~/composables/useModals";
import { ModalsEnum } from "~/enums/Modals.enums";

const modalCtrl = useModals();
const emit = defineEmits(["handleDelete", "handleUpdateTitle"]);
const props = defineProps<ISurveyCardProps>();

const handleRenameButtonClick = () => {
  modalCtrl.dialog.name = ModalsEnum.SURVEY_RENAME;
  modalCtrl.setData({
    text: props.title,
    id: props.id,
    action: (title) => {
      emit("handleUpdateTitle", props.id, title);
    },
  });
  modalCtrl.toggleDialog();
};

const handleDeleteButtonClick = () => {
  modalCtrl.dialog.name = ModalsEnum.ITEM_DELETE;
  modalCtrl.setData({
    id: props.id,
    message: "Are you sure you want to delete this survey",
    action: () => {
      emit("handleDelete", props.id);
    },
  });
  modalCtrl.toggleDialog();
};

const items: ISurveyCardMenu[] = [
  {
    label: "Rename",
    isAdminAction: true,
    action: handleRenameButtonClick,
  },
  {
    label: "Delete",
    isAdminAction: true,
    action: handleDeleteButtonClick,
  },
  {
    label: "Edit",
    isAdminAction: true,
    action: () => {
      navigateTo(`/admin/surveys/${props.id}`)
    },
  },
  {
    label: "View Responses",
    isAdminAction: true,
    action: () => {
      navigateTo(`/admin/surveys/${props.id}/responses`)
    },
  },
];

const itemsList = computed(() => {
  return items.filter(
    (item) => (item.isAdminAction && props.isAdmin) || !item.isAdminAction
  );
});
</script>

<style scoped>
.border-decoration {
  border-top: solid 5px;
  border-color: #311432;
  border-radius: 5px;
}
</style>
