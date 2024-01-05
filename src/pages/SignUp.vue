// eslint-disable-next-line vue/multi-word-component-names
<template>
  <section className="container-box">
    <div className="container">
      <div className="row">
        <div
          style="
            background: url('https://amentotech.com/htmls/doclist/images/slider/banner-img.png');
            background-size: cover;
            background-position: left;
          "
          className="col-12 col-lg-6 d-lg-flex d-none align-center"
        >
          <img
            v-if="route.path.split('/').pop() == 'host'"
            width="500"
            src="@/assets/profile.webp"
            alt=""
          />
          <img v-else width="500" src="@/assets/vendor.webp" alt="" />
        </div>
        <div className="col-12 col-lg-6">
          <div className="background-div">
            <div className="main-form">
              <!-- <div className="logo">
                <img width="100" src="@/assets/logoCompany.png" />
              </div> -->
              <div className="form-padding py-4">
                <input
                  v-model="state.full_name"
                  className="form-control"
                  type="text"
                  placeholder="Enter Full Name"
                  aria-label="default input example"
                />
                <div
                  class="input-errors"
                  v-for="error of v$.full_name.$errors"
                  :key="error.$uid"
                >
                  <small class="p-error">{{
                    error.$validator == "required" ? "Name is required" : ""
                  }}</small>
                </div>
              </div>
              <div className="">
                <input
                  v-model="state.password"
                  className="form-control"
                  type="password"
                  placeholder="Enter Password"
                  aria-label="default input example"
                />
                <div
                  class="input-errors"
                  v-for="error of v$.password.$errors"
                  :key="error.$uid"
                >
                  <small class="p-error">{{
                    error.$validator == "required" ? "Password is required" : ""
                  }}</small>
                </div>
              </div>
              <div className="form-padding py-4">
                <input
                  v-model="state.email"
                  className="form-control"
                  type="text"
                  placeholder="Enter Email"
                  aria-label="default input example"
                />
                <div
                  class="input-errors"
                  v-for="error of v$.email.$errors"
                  :key="error.$uid"
                >
                  <small class="p-error">{{
                    error.$validator == "required" ? "Email is required" : ""
                  }}</small>
                </div>
              </div>
              <div className="form-padding py-4">
                <input
                  v-model="state.phone_number"
                  className="form-control"
                  type="text"
                  placeholder="Enter Phone Number"
                  aria-label="default input example"
                />
                <div
                  class="input-errors"
                  v-for="error of v$.phone_number.$errors"
                  :key="error.$uid"
                >
                  <small class="p-error">{{
                    error.$validator == "required"
                      ? "Phone Number is required"
                      : ""
                  }}</small>
                </div>
              </div>
              <div className="form-padding py-4">
                <input
                  disabled
                  v-model="state.role"
                  className="form-control"
                  type="text"
                  placeholder="Enter Email"
                  aria-label="default input example"
                />
                <div
                  class="input-errors"
                  v-for="error of v$.role.$errors"
                  :key="error.$uid"
                >
                  <small class="p-error">{{
                    error.$validator == "required" ? "Role is required" : ""
                  }}</small>
                </div>
              </div>
              <div className="d-flex row py-4 text-center check-box">
                <div className="py-4">
                  <div className="d-grid gap-2">
                    <button
                      @click="save"
                      class="btn btn-outline-primary my-2"
                      type="button"
                    >
                      <div
                        v-if="btnLoader"
                        class="spinner-border"
                        role="status"
                      >
                        <span class="sr-only"></span>
                      </div>
                      <span v-else> SignUp </span>
                    </button>
                    <button
                      @click="clear"
                      class="btn btn-outline-primary my-2"
                      type="button"
                    >
                      clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
  import { reactive, ref } from "vue";
  import { useVuelidate } from "@vuelidate/core";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  import { email, required } from "@vuelidate/validators";
  import signUpService from "@/services/authenticationService";
  import { useRoute, useRouter } from "vue-router";
  const show1 = ref(false);
  const btnLoader = ref(false);
  const msg = ref("");
  const colorToast = ref("");
  const router = useRouter();
  const route = useRoute();

  const initialState = {
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    role: route.params.type,
  };
  initialState.role = route.params.type;
  const state = reactive({
    ...initialState,
  });
  // ToastOptions
  const rules = {
    full_name: { required },
    email: { required, email },
    password: { required },
    phone_number: { required },
    role: {},
  };

  const v$ = useVuelidate(rules, state);

  function clear() {
    v$.value.$reset();

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value;
    }
  }
  const save = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) {
      return;
    } else {
      btnLoader.value = true;
      try {
        let res = await signUpService.registration(state);
        if (res) {
          console.log(res);
          btnLoader.value = false;
          colorToast.value = "success";
          msg.value = "Registration Done";
          toast("SignUp SuccessFull !", {
            autoClose: 1000,
            style: {
              opacity: "1",
            },
          });
          setTimeout(() => {
            router.push("/");
          }, 1500);
        }
      } catch (err) {
        // console.log(err.response.data.detail);
        btnLoader.value = false;
        colorToast.value = "error";
        msg.value = err.response.data.detail;
        toast(err.response.data.detail, {
          autoClose: 1000,
          style: {
            opacity: "1",
          },
        });
      }
    }
  };
</script>