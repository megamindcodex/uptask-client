<script setup>
</script>

<template>
  <section id="feature-section">
    <h2 class="section-title">Features</h2>

    <div class="feature-grid">
      <div class="feature-card">
        <h4>Add Goals & Tasks</h4>
        <p>Create new goals and tasks seamlessly with just a few clicks.</p>
      </div>

      <div class="feature-card">
        <h4>Edit Anytime</h4>
        <p>Modify titles, notes, and task content effortlessly.</p>
      </div>

      <div class="feature-card">
        <h4>Stay Organized</h4>
        <p>Tick off completed tasks and remove unneeded ones instantly.</p>
      </div>

      <div class="feature-card">
        <h4>Track Progress</h4>
        <p>View progress indicators to stay motivated and on track.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
#feature-section {
  width: 100%;
  padding: 20px 15px;
  background: #f8fbfc;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Section Title */
.section-title {
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: #0b6d79;
}

/* Grid Layout */
.feature-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Card Styling */
.feature-card {
  width: 100%;
  background: white;
  border-radius: 12px;
  padding: 16px 18px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #fece51;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* .feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
} */

.feature-card h4 {
  margin-bottom: 6px;
  font-size: 1.1rem;
  color: #086977;
  font-weight: 600;
}

.feature-card p {
  font-size: 0.95rem;
  color: #3a4444;
  line-height: 1.4rem;
}
</style>
