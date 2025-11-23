<script setup>
import { ref } from 'vue'

import img1 from '../../assets/image/Screenshot-figure-1.png'
import img2 from '../../assets/image/Screenshot-figure-2.png'
import img3 from '../../assets/image/Screenshot-figure-3.png'
import img4 from '../../assets/image/Screenshot-figure-4.png'
import img5 from '../../assets/image/Screenshot-figure-5.png'
import img6 from '../../assets/image/Screenshot-figure-6.png'
import img7 from '../../assets/image/Screenshot-figure-7.png'

const selectedImg = ref(null)
const imgAlt = ref('')
const display = ref(false)

const displayImageDialog = ({ src, alt }) => {
  selectedImg.value = src
  imgAlt.value = alt
  display.value = true
}
</script>

<template>
  <section id="how-it-works-section">
    <h2 class="section-title">How It Works</h2>

    <div class="steps-container">
      <!-- Step 1 -->
      <div class="step-card">
        <h4>Create a Goal</h4>
        <p>Start by entering a title and description for your new goal.</p>
        <img
          :src="img1"
          alt="Enter title & description"
          @click="displayImageDialog({ src: img1, alt: 'Enter title & description' })"
        />
      </div>

      <!-- Step 2 -->
      <div class="step-card">
        <h4>Add Tasks</h4>
        <p>Create individual tasks with content and optional notes.</p>
        <img
          :src="img2"
          alt="Each task has content & note."
          @click="displayImageDialog({ src: img2, alt: 'Each task has content & note.' })"
        />
      </div>

      <!-- Step 3 -->
      <div class="step-card">
        <h4>Track Progress</h4>
        <p>Check off tasks as you complete them to update progress.</p>
        <img
          :src="img3"
          alt="Tick off completed tasks"
          @click="displayImageDialog({ src: img3, alt: 'Tick off completed tasks' })"
        />
      </div>

      <!-- Step 4 -->
      <div class="step-card">
        <h4>Edit or Delete Goals</h4>
        <p>Make changes at any time or remove an entire goal if needed.</p>

        <div class="multi-img">
          <img
            :src="img4"
            alt="Edit your goal anytime"
            @click="displayImageDialog({ src: img4, alt: 'Edit your goal anytime' })"
          />
          <img
            :src="img5"
            alt="Remove any goal anytime"
            @click="displayImageDialog({ src: img5, alt: 'Remove any goal anytime' })"
          />
        </div>
      </div>

      <!-- Step 5 -->
      <div class="step-card">
        <h4>Edit or Delete Tasks</h4>
        <p>Modify task details or remove a task completely.</p>

        <div class="multi-img">
          <img
            :src="img6"
            alt="Edit any task anytime"
            @click="displayImageDialog({ src: img6, alt: 'Edit any task anytime' })"
          />

          <img
            :src="img7"
            alt="Remove any task anytime"
            @click="displayImageDialog({ src: img7, alt: 'Remove any task anytime' })"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Vuetify Dialog -->
  <v-dialog persistent v-model="display" max-width="700">
    <v-card class="d-flex w-100">
      <v-btn color="teal" variant="tonal" class="w-40 align-self-end" @click="display = false">
        Close
      </v-btn>

      <v-img :src="selectedImg" :alt="imgAlt" cover height="auto"></v-img>
    </v-card>
  </v-dialog>
</template>

<style scoped>
#how-it-works-section {
  width: 100%;
  padding: 20px;
  background: #f8fbfc;
  border-radius: 12px;
}

.section-title {
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: #0b6d79;
  margin-bottom: 20px;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Step Card */
.step-card {
  background: white;
  border-radius: 12px;
  padding: 16px 18px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
  border-left: 4px solid #fece51;
  transition: transform 0.2s ease;
}

/* .step-card:hover {
  transform: translateY(-3px);
} */

.step-card h4 {
  margin-bottom: 6px;
  font-size: 1.1rem;
  color: #086977;
  font-weight: 600;
}

.step-card p {
  margin-bottom: 10px;
  font-size: 0.95rem;
  color: #3a4444;
  line-height: 1.4rem;
}

/* Single Image */
.step-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid #e0e4e4;
  transition: opacity 0.2s;
}

.step-card img:hover {
  opacity: 0.92;
}

/* Multi-image row */
.multi-img {
  display: flex;
  gap: 10px;
}

.multi-img img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid #e0e4e4;
}
</style>
