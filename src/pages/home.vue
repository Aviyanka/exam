<template>
  <div>
    <Loader v-if="isLoading" />
    <div class="container my-10">
      <div class="row">
        <div
          v-for="item in vendroArr"
          :key="item"
          class="col-lg-4 col-sm-6 col-12"
        >
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h6>{{ item.name }}</h6>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { onMounted, ref } from "vue";
  import { toast } from "vue3-toastify";
  import { useAppStore } from "@/store/app";
  import Loader from "@/components/globalLoader.vue";
  import vendorService from "@/services/venodorService";
  const vendroArr = ref([]);
  const isLoading = ref(true);
  onMounted(()=>{
    toast('User is Authenticated', {
          autoClose: 1000,
          style: {
            opacity: "1",
          },
        });
  })
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