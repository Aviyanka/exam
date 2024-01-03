<template>
  <div>
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height">
        <v-progress-circular
          v-if="isLoading"
          indeterminate
          color="primary"
        ></v-progress-circular>
        <div v-else>
          <div>
            <h1 class="text-h3">Types Of Vendor</h1>
            <!-- <v-btn @click="addModal" class="mt-5">Add Vendor Type</v-btn> -->
          </div> 

          <v-row class="mt-10">
            <v-col
              v-for="(item, index) in vendroArr"
              :key="index"
              cols="12"
              md="4"
            >
              <!-- {{ item }} -->
              <v-card
                class="mx-auto my-8"
                max-width="344"
                :title="item.name"
                subtitle="Vendor Details"
                link
                elevation="10"
                rounded="xl"
              ></v-card>
            </v-col>
          </v-row>
        </div>
      </v-responsive>
    </v-container>
  </div>
</template>
<script setup>
  import { onMounted, ref } from "vue";
  import { useAppStore } from "@/store/app";
  import vendorService from "@/services/venodorService";
  const vendroArr = ref([]);
  const isLoading = ref(true);
  const getVendorTypes = async () => {
    try {
      let res = await vendorService.fetchAllVendorType();
      if (res.status == 200) {
        vendroArr.value = res.data.vendor_types;
        isLoading.value = false;
      }
    } catch (err) {
      console.log(err);
      isLoading.value = false;
      alert(err);
    }
  };
  onMounted(() => {
    useAppStore().checkAuthentication();
    getVendorTypes();
  });
  const addModal = () => {};
</script>