
<template>
  <div id="about-page">
    <!-- Header -->
    <section id="about-hero">
      <h1>About This App</h1>
      <p>Your goals deserve more than a forgotten checklist.</p>
    </section>

    <!-- Mission -->
    <section class="mission">
      <h2>Our Mission</h2>
      <p>
        This application is built to help you stay focused, organized, and motivated. It keeps your
        goals structured and your tasks clear so you can actually finish what you start.
      </p>
    </section>

    <!-- Origin Story -->
    <section class="origin">
      <h2>How It Started</h2>
      <p>
        The idea began with a simple need: a clean, distraction-free space to track goals and break
        them into actionable tasks. No clutter. No unnecessary features. Just a flexible system
        designed to help you move forward naturally.
      </p>
    </section>

    <!-- What Makes It Different -->
    <section class="difference">
      <h2>What Makes It Different</h2>
      <ul>
        <li>Goals organized with clear, editable tasks</li>
        <li>Simple and intuitive layout</li>
        <li>Fast, responsive, and built with modern tech</li>
        <li>Designed to grow with future features</li>
      </ul>
    </section>

    <!-- Creator Section -->
    <section class="creator">
      <h2>About the Creator</h2>
      <p>
        Built by Emman, a full-stack web developer passionate about creating clean, purposeful
        digital tools that make life easier and more organized.
      </p>
    </section>

    <!-- Future Plans -->
    <section class="future">
      <h2>Future Plans</h2>
      <ul>
        <li>Analytics for completed tasks and goal progress</li>
        <li>Smart notifications and deadline tracking</li>
        <li>Real-time syncing and collaboration tools</li>
        <li>Mobile-first companion app</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
// Static page, no logic needed yet
</script>

<style scoped>
#about-page {
  width: 100%;
  background: #f9f9f9;
  padding-bottom: 3rem;
  font-family: 'Poppins', sans-serif;
  color: #333;
}

/* Hero */
#about-hero {
  text-align: center;
  padding: 4rem 10%;
  background: linear-gradient(135deg, #0f8193, #fece51);
  box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.6);
  color: #fff;
}

#about-hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

#about-hero p {
  font-size: 1.2rem;
}

/* Sections */
section {
  padding: 3rem 10%;
  max-width: 900px;
  margin: 0 auto;
}

section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0f8193;
}

section p {
  font-size: 1.1rem;
  line-height: 1.7;
}

.difference ul,
.future ul {
  list-style: none;
  padding: 0;
}

.difference li,
.future li {
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

/* Creator Section Highlight */
.creator {
  background: #fff;
  padding: 3rem 10%;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}
</style>
