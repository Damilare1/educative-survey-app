<template>
  <NuxtLayout name="surveycard">
    <v-container>
      <h5 class="text-h5 mb-6">{{ response.question }}</h5>
      <div class="chartContainer">
        <Bar :id="chartId" :options="config.options" :data="config.data" />
      </div>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface ISurveyChartProps {
  response: any;
}
const data = defineProps<ISurveyChartProps>();

const config = computed(() => {
  const { options } = toRaw(data.response);
  const configOptions = {
    data: {
      labels: options.map((x: any) => x.label),
      datasets: [
        {
          label: "Results",
          data: options.map((row: any) => row.count),
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  };
  return configOptions;
});

const id = getCurrentInstance()?.uid;
const chartId = `chart_${id}`;
</script>

<style scoped>
.chartContainer {
  width: 50%;
}
@media only screen and (max-width: 600px) {
  .chartContainer {
    width: 100%;
  }
}
</style>
