<template>
  <div class="md:ml-64 text-4xl text-center text-blue-700 font-semibold pt-10">
    <h2 class="px-3">{{ message }}</h2>
    <div
      class="flex flex-col sm:flex-row items-center sm:items-stretch gap-5 px-5 pt-8 justify-center"
    >
      <div
        class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6"
      >
        <div class="flex justify-between items-start w-full">
          <div class="flex-col items-center">
            <div class="flex items-center mb-1">
              <h5
                class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1"
              >
                Tickets en attente
              </h5>
            </div>
          </div>
        </div>

        <div class="py-6" id="pie-chart"></div>
      </div>
      <router-link
        to="/dashboard/my-tickets"
        class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 hover:bg-gray-100 p-4 md:p-6"
      >
        <div class="flex-col items-center">
          <div class="flex items-center mb-1">
            <h5
              class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1"
            >
              Nombre total de tickets
            </h5>
          </div>
        </div>
        <div class="h-4/5 flex items-center justify-center">
          <h1 class="text-8xl font-bold text-[#1C64F2] dark:text-white">
            {{ totalTickets }}
          </h1>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";
import { onBeforeUnmount, onMounted, ref } from "vue";
export default {
  name: "DashboardHome",
  setup() {
    const message = ref("You are not logged in.");
    const userId = localStorage.getItem("userId");
    const totalTickets = ref(0);

    let chart = null;

    onMounted(async () => {
      const responseUsername = await fetch(
        `${process.env.VUE_APP_HOST}/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!responseUsername.ok) {
        throw new Error("HTTP error " + responseUsername.status);
      }
      const content = await responseUsername.json();
      const user = content.user;
      message.value = `Bienvenue sur ton tableau de bord ${user.username}`;

      const responseTickets = await fetch(
        `${process.env.VUE_APP_HOST}/tickets`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const tickets = await responseTickets.json();
      totalTickets.value = tickets.length;
      if (!Array.isArray(tickets)) {
        console.error("Expected tickets to be an array, but got:", tickets);
        tickets = [];
      }
      const pendingTickets = tickets.filter(
        (ticket) => ticket.status === "PENDING"
      ).length;
      const pendingPercentage = parseFloat(
        ((pendingTickets / totalTickets.value) * 100).toFixed(1)
      );
      const nonPendingPercentage = parseFloat(
        (100 - pendingPercentage).toFixed(1)
      );

      // chart pie
      const getChartOptions = () => {
        return {
          series: [pendingPercentage, nonPendingPercentage],
          colors: ["#1C64F2", "#16BDCA"],
          chart: {
            height: 420,
            width: "100%",
            type: "pie",
          },
          stroke: {
            colors: ["white"],
            lineCap: "",
          },
          plotOptions: {
            pie: {
              labels: {
                show: true,
              },
              size: "100%",
              dataLabels: {
                offset: -25,
              },
            },
          },
          labels: ["En attente", "Validé"],
          dataLabels: {
            enabled: true,
            style: {
              fontFamily: "Inter, sans-serif",
            },
          },
          legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return value + "%";
              },
            },
          },
          xaxis: {
            labels: {
              formatter: function (value) {
                return value + "%";
              },
            },
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
        };
      };

      // chart pie

      const chartElement = document.getElementById("pie-chart");
      if (chartElement) {
        chart = new ApexCharts(chartElement, getChartOptions());
        chart.render();
      }
    });
    onBeforeUnmount(() => {
      if (chart) {
        chart.destroy();
      }
    });

    return { message, totalTickets };
  },
};
</script>

<style scoped></style>
