<template>
  <div
    class="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
  >
    <div class="w-full max-w-lg border border-pink-500 p-10 rounded-3xl">
      <div class="text-center mb-10">
        <h1
          class="text-4x1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        >
          Get in Touch
        </h1>
        <p class="mt-3 text-gray-400">We'll respond whithin 24 hours</p>
      </div>

      <form class="space-y-6" @submit.prevent="submitForm">
        <FloatingInput
          v-model="form.name"
          id="name"
          label="Full Name"
          borderColor="purple"
        />
        <FloatingInput
          v-model="form.email"
          id="email"
          label="Email Address"
          type="email"
          borderColor="pink"
        />
        <FloatingInput
          v-model="form.subject"
          id="subject"
          label="Subject"
          borderColor="red"
        />
        <FloatingInput
          v-model="form.message"
          id="message"
          label="Your Message"
          isTextarea
          borderColor="purple"
        />
        <div class="pt-4">
          <button
            type="submit"
            class="w-full relative inline-flex items-center justify-center p-0.5 text-sm fomt-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500"
          >
            <span
              class="relative w-full px-5 py-3 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0 flex items-center justify-center"
              :class="{
                'text-white': !isSubmitting,
                'text-gray-400': isSubmitting,
              }"
            >

            <ArrowPathIcon
            v-if="isSubmitting"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            />
              {{ isSubmitting ? "Sending..." : "Send Message" }}
            </span>
          </button>
        </div>
      </form>
    </div>
    <h1 class="text-3xl font-bold underline"></h1>
  </div>
</template>
<script setup>
import FloatingInput from "./components/FloatingInput.vue";
import { ref } from "vue";
import { ArrowPathIcon } from "@heroicons/vue/16/solid";
import { useToastify } from "./composables/useToastify";
import emailjs from '@emailjs/browser'

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
const {success,error} = useToastify();

const isSubmitting = ref(false);

const submitForm = async ()=>{
  isSubmitting.value=true;

  const templateParams = {
    name:form.value.name,
    email:form.value.email,
    subject:form.value.subject,
    message:form.value.message,
  }

  try{
    await emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID, templateParams);

    success("Message sent successfully ! We'll get back to you soon.");
    form.value = { name:'', email:'', subject:'', message:''}
  } catch(err){
    error(err.message || 'Failed to send message. Please try again')
  } finally {
    isSubmitting.value = false
  }
}

</script>
