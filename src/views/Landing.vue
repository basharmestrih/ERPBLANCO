<template>
  <section class="landing-page">
    <div class="landing-hero">
      <div class="landing-hero__image">
        <header class="landing-hero__header">
          <span class="landing-brand">{{ t("app.brand") }}</span>
          <nav class="landing-hero__nav">
            <button type="button" class="landing-hero__link" @click="handleStart">
              {{ t("route.login") }}
            </button>
            <button type="button" class="landing-hero__link" @click="customScroll(contactSection, 1200)">
              {{ t("landing.contactNav") }}
            </button>
          </nav>
        </header>

        <div class="landing-hero__copy">
          <h1>{{ t("landing.heroTitle") }}</h1>
          <p class="text-body-1">{{ t("landing.heroSubtitle") }}</p>

          <div class="landing-hero__actions">
            <v-btn
              class="landing-start text-amber-darken-1"
              @click="handleStart"
            >
              {{ t("landing.startNow") }}
            </v-btn>
          </div>
        </div>

        <div class="landing-hero__cards">
          <transition-group name="landing-card" tag="div" class="landing-hero__cards-grid">
            <LandingFeatureCard
              v-for="card in heroCards"
              :key="card.title"
              :title="card.title"
              :subtitle="card.subtitle"
              :icon="card.icon"
            />
          </transition-group>
        </div>

        <div class="landing-hero__footer">
          <v-btn variant="text" class="landing-explore-all" @click="handleExploreClick">
            {{ t("landing.exploreAll") }}
          </v-btn>
        </div>
      </div>
    </div>

    <div class="landing-features" ref="featureSection">
      <div class="landing-features__inner">
        <div class="landing-features__heading">
          <h2 class ="landing-features-title">{{ t("landing.featuresTitle") }}</h2>
          <p>{{ t("landing.featuresSubtitle") }}</p>
        </div>
        <div class="landing-features__grid">
          <LandingFeatureCard
            v-for="feature in featureCards"
            :key="feature.title"
            :title="feature.title"
            :subtitle="feature.subtitle"
            :icon="feature.icon"
            variant="muted"
          />
        </div>
      </div>
    </div>

    <section class="how-to">
      <h3 class="how-to__title">How to start</h3>
      <div class="how-to__grid">
        <div v-for="(step, index) in howToSteps" :key="step" class="how-to__step">
          <div class="how-to__indicator">
            <div class="how-to__line"></div>
            <span class="how-to__number">{{ index + 1 }}</span>
          </div>
          <div class="how-to__content">
            <p class="how-to__text">{{ step }}</p>
          </div>
        </div>
      </div>
    </section>

    <div class="landing-contact-wrapper">
      <div class="landing-contact" ref="contactSection">
        <div class="landing-contact__info">
          <h3>{{ t("landing.contactTitle") }}</h3>
          <p>{{ t("landing.contactSubtitle") }}</p>
        </div>
        <div class="landing-contact__actions">
          <v-btn outlined color="white" class="landing-contact__btn">
            {{ t("landing.contactButton") }}
          </v-btn>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import LandingFeatureCard from "@/components/landing/LandingFeatureCard.vue"
import { useLocale } from "@/composables/useLocale"

const { t } = useLocale()
const router = useRouter()
const featureSection = ref<HTMLElement | null>(null)
const contactSection = ref<HTMLElement | null>(null)

const heroCards = [
  { title: "Create & view orders", subtitle: "Capture, approve and review sales across one responsive pane.", icon: "mdi-cart-plus" },
  { title: "Auto stock & invoices", subtitle: "Approving an order kicks off stock moves and invoice generation.", icon: "mdi-check-decagram" },
  { title: "Manual stock movements", subtitle: "Create in/out records whenever you need precise adjustments.", icon: "mdi-swap-vertical" },
  { title: "Products & warehouses", subtitle: "Create, delete, and sync product + warehouse data without friction.", icon: "mdi-warehouse" },
]

const featureCards = [
  { title: "Warehouse automation", subtitle: "Approving orders updates warehouse product data in real time.", icon: "mdi-cog-sync-outline" },
  { title: "Product lifecycle", subtitle: "Products can be created or deleted with instant catalog sync.", icon: "mdi-cube-outline" },
  { title: "Warehouse ops", subtitle: "Create or delete warehouses and keep visibility across locations.", icon: "mdi-database-sync" },
  { title: "Customer management", subtitle: "Create/delete customers while tracking every relationship detail.", icon: "mdi-account-multiple-plus" },
  { title: "User provisioning", subtitle: "Invite users, enforce the team-only login system, and monitor access.", icon: "mdi-account-check-outline" },
  { title: "Filterized data", subtitle: "Every list supports advanced filters so your teams stay focused.", icon: "mdi-filter-variant" },
  { title: "Language & settings", subtitle: "Use the settings page to keep language selection aligned across teams.", icon: "mdi-cog-outline" },
  { title: "Live stats main page", subtitle: "See real system stats on the main page and drill into actions.", icon: "mdi-chart-areaspline" },
]

const howToSteps = [
  "Book your demo",
  "Add your products data",
  "Add your human data",
  "Start managing your platform",
  "Scale your business"
]

const customScroll = (element: HTMLElement | null, duration: number) => {
  if (!element) return;
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  const ease = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };
  requestAnimationFrame(animation);
};

const handleExploreClick = () => {
  customScroll(featureSection.value, 900); 
}

const handleStart = () => {
  router.push("/login")
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: #101010;
  color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.landing-hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: stretch;
  background: #030303;
}

.landing-hero__image {
  flex: 1;
  background: linear-gradient(120deg, rgba(3, 3, 3, 0.9), rgba(3, 3, 3, 0.6)),
    url("https://images.pexels.com/photos/1267329/pexels-photo-1267329.jpeg")
      center/cover no-repeat;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
}

.landing-brand {
  font-size: clamp(2.4rem, 3vw, 3.2rem);
  font-family: "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive;
  font-weight: 900;
  letter-spacing: 0.3rem;
}

.landing-hero__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.landing-hero__nav {
  display: flex;
  gap: 1.25rem;
}

.landing-hero__link {
  background: transparent;
  border: none;
  color: #f5f5f5;
  font-weight: 600;
  letter-spacing: 0.08em;
  cursor: pointer;
}

.landing-hero__copy h1 {
  font-size: clamp(2.1rem, 2.4vw, 2.5rem);
  margin-bottom: 0.5rem;
}

.landing-start {
  text-transform: uppercase;
  min-width: 260px;
  width: min(60vw, 340px);
  height: 58px;
  border-radius: 10px;
  letter-spacing: 5px;
  background-color: black;
  font-weight: 700;
}

.landing-hero__cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.landing-hero__footer {
  display: flex;
  justify-content: center;
}

.landing-explore-all {
  color: #f8c05c;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.landing-explore-all::after {
  content: "↓";
  margin-left: 0.5rem;
}

/* Features */
.landing-features {
  padding: 0rem 1rem;
  margin-inline: 1rem;
  
}
.landing-features-title{
  font-weight: 900;
  font-size: 2.3rem;
  letter-spacing: 0.2rem;

}

.landing-features__grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

/* How To Start Section */
.how-to {
  padding: 0rem 1.5rem;
  margin-inline: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.how-to__title {
  font-size: 1.5rem;
  font-size: clamp(2.4rem, 3vw, 3.2rem);
  font-family: "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive;
  font-weight: 900;
  letter-spacing: 0.3rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
}

.how-to__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.25rem;
}

.how-to__step {
  display: flex;
  gap: 1.5rem;
  transition: transform 0.3s ease;
}

.how-to__step:hover {
  transform: translateY(-5px);
}

.how-to__indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.how-to__line {
  height: 40px;
  width: 2px;
  background: linear-gradient(to bottom, white, transparent);
  margin-bottom: 0.5rem;
}

.how-to__number {
  font-size: 4rem;
  font-weight: 900;
  color: white;
  line-height: 1;
}

.how-to__content {
  padding-top: 2.5rem;
}

.how-to__text {
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: 0.3rem;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.7);
}

/* Contact Section */
.landing-contact-wrapper {
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
}

.landing-contact {
  background: #080808;
  border-radius: 1.5rem;
  width: min(90vw, 760px);
  padding: 1.5rem 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-inline: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.landing-contact__btn {
  color: black;
  border: 1px solid rgba(248, 192, 92, 0.5) !important;
}

/* Responsive */
@media (max-width: 1100px) {
  .how-to__grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 960px) {
  .landing-hero__nav { flex-direction: column; align-items: flex-end; }
  .landing-contact { 
    flex-direction: column; 
    text-align: center; 
    gap: 2rem;
    padding: 2rem;
  }
  .how-to__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .landing-hero__header { flex-direction: column; align-items: flex-start; }
  .landing-features, .how-to { margin-inline: 0.5rem; }
}
</style>
